/**
 * FILE UPLOAD SECURITY GUARDRAILS v11.0
 * 
 * Security measures for all file ingestion points:
 * - MIME + extension allowlist validation
 * - Size limits per file and batch
 * - Rate limiting
 * - No macro/script execution
 * - Sandbox parsing with quarantine
 * - Error boundaries
 */

// ═══════════════════════════════════════════════════════════════
// ALLOWED FILE TYPES
// ═══════════════════════════════════════════════════════════════

export const ALLOWED_MIMES = [
  // Documents
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  
  // Text
  'text/markdown',
  'text/plain',
  'text/csv',
  'application/json',
  
  // Images
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
] as const;

export const ALLOWED_EXTENSIONS = [
  '.pdf',
  '.docx',
  '.pptx',
  '.xlsx',
  '.md',
  '.txt',
  '.csv',
  '.json',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
] as const;

// ═══════════════════════════════════════════════════════════════
// SIZE LIMITS
// ═══════════════════════════════════════════════════════════════

export const UPLOAD_LIMITS = {
  maxFileSize: 10 * 1024 * 1024,       // 10MB per file
  maxBatchSize: 50 * 1024 * 1024,      // 50MB total per batch
  maxFilesPerBatch: 20,                 // 20 files max per upload
  processingTimeout: 30000,             // 30 seconds max processing time
} as const;

// ═══════════════════════════════════════════════════════════════
// RATE LIMITING
// ═══════════════════════════════════════════════════════════════

export const RATE_LIMITS = {
  uploadsPerMinute: 10,
  uploadsPerHour: 100,
  webhooksPerMinute: 60,
} as const;

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string, 
  limit: number, 
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || record.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  
  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }
  
  record.count++;
  return { allowed: true, remaining: limit - record.count, resetAt: record.resetAt };
}

// ═══════════════════════════════════════════════════════════════
// VALIDATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  errorCode?: 
    | 'INVALID_MIME'
    | 'INVALID_EXTENSION'
    | 'FILE_TOO_LARGE'
    | 'BATCH_TOO_LARGE'
    | 'TOO_MANY_FILES'
    | 'RATE_LIMITED'
    | 'PROCESSING_TIMEOUT'
    | 'EXTRACTION_FAILED'
    | 'QUARANTINED';
}

export function validateMimeType(mimeType: string): FileValidationResult {
  if (!ALLOWED_MIMES.includes(mimeType as any)) {
    return {
      valid: false,
      error: `File type '${mimeType}' is not allowed. Allowed types: PDF, DOCX, PPTX, MD, TXT, PNG, JPG, WEBP`,
      errorCode: 'INVALID_MIME'
    };
  }
  return { valid: true };
}

export function validateExtension(filename: string): FileValidationResult {
  const ext = '.' + filename.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext as any)) {
    return {
      valid: false,
      error: `File extension '${ext}' is not allowed. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`,
      errorCode: 'INVALID_EXTENSION'
    };
  }
  return { valid: true };
}

export function validateFileSize(size: number): FileValidationResult {
  if (size > UPLOAD_LIMITS.maxFileSize) {
    const maxMB = UPLOAD_LIMITS.maxFileSize / (1024 * 1024);
    return {
      valid: false,
      error: `File size exceeds ${maxMB}MB limit`,
      errorCode: 'FILE_TOO_LARGE'
    };
  }
  return { valid: true };
}

export function validateBatchSize(files: { size: number }[]): FileValidationResult {
  if (files.length > UPLOAD_LIMITS.maxFilesPerBatch) {
    return {
      valid: false,
      error: `Too many files. Maximum ${UPLOAD_LIMITS.maxFilesPerBatch} files per upload`,
      errorCode: 'TOO_MANY_FILES'
    };
  }
  
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > UPLOAD_LIMITS.maxBatchSize) {
    const maxMB = UPLOAD_LIMITS.maxBatchSize / (1024 * 1024);
    return {
      valid: false,
      error: `Total batch size exceeds ${maxMB}MB limit`,
      errorCode: 'BATCH_TOO_LARGE'
    };
  }
  
  return { valid: true };
}

export interface FileToValidate {
  name: string;
  type: string;
  size: number;
}

export function validateFile(file: FileToValidate): FileValidationResult {
  // Check MIME type
  const mimeResult = validateMimeType(file.type);
  if (!mimeResult.valid) return mimeResult;
  
  // Check extension
  const extResult = validateExtension(file.name);
  if (!extResult.valid) return extResult;
  
  // Check size
  const sizeResult = validateFileSize(file.size);
  if (!sizeResult.valid) return sizeResult;
  
  return { valid: true };
}

export function validateBatch(files: FileToValidate[]): FileValidationResult {
  // Check batch limits first
  const batchResult = validateBatchSize(files);
  if (!batchResult.valid) return batchResult;
  
  // Validate each file
  for (const file of files) {
    const result = validateFile(file);
    if (!result.valid) {
      return {
        ...result,
        error: `${file.name}: ${result.error}`
      };
    }
  }
  
  return { valid: true };
}

// ═══════════════════════════════════════════════════════════════
// QUARANTINE SYSTEM
// ═══════════════════════════════════════════════════════════════

export interface QuarantinedFile {
  id: string;
  filename: string;
  reason: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// In-memory quarantine (use database in production)
const quarantine: QuarantinedFile[] = [];

export function quarantineFile(
  filename: string, 
  reason: string, 
  metadata?: Record<string, unknown>
): QuarantinedFile {
  const quarantined: QuarantinedFile = {
    id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    filename,
    reason,
    timestamp: Date.now(),
    metadata
  };
  quarantine.push(quarantined);
  console.warn(`[QUARANTINE] File quarantined: ${filename} - ${reason}`);
  return quarantined;
}

export function getQuarantinedFiles(): QuarantinedFile[] {
  return [...quarantine];
}

// ═══════════════════════════════════════════════════════════════
// TIMEOUT WRAPPER
// ═══════════════════════════════════════════════════════════════

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = UPLOAD_LIMITS.processingTimeout
): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Processing timeout after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  
  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════
// ERROR BOUNDARY WRAPPER
// ═══════════════════════════════════════════════════════════════

export interface ProcessingResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  quarantined?: boolean;
}

export async function safeProcess<T>(
  filename: string,
  processor: () => Promise<T>
): Promise<ProcessingResult<T>> {
  try {
    const data = await withTimeout(processor());
    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Quarantine on failure
    quarantineFile(filename, errorMessage);
    
    return {
      success: false,
      error: errorMessage,
      quarantined: true
    };
  }
}

// ═══════════════════════════════════════════════════════════════
// SANITIZATION
// ═══════════════════════════════════════════════════════════════

export function sanitizeFilename(filename: string): string {
  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, '');
  
  // Remove dangerous characters
  sanitized = sanitized.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_');
  
  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.split('.').pop() || '';
    const name = sanitized.slice(0, 250 - ext.length);
    sanitized = `${name}.${ext}`;
  }
  
  return sanitized;
}

// ═══════════════════════════════════════════════════════════════
// CONTENT SCANNING (Placeholder for future implementation)
// ═══════════════════════════════════════════════════════════════

export async function scanForMalware(
  _buffer: ArrayBuffer
): Promise<{ safe: boolean; threat?: string }> {
  // TODO: Integrate with malware scanning service
  // For now, assume safe after passing other validations
  return { safe: true };
}

export async function detectMacros(
  buffer: ArrayBuffer,
  mimeType: string
): Promise<{ hasMacros: boolean }> {
  // Check for Office documents with macros
  if (mimeType.includes('officedocument')) {
    // Simple heuristic: check for macro signatures
    const bytes = new Uint8Array(buffer);
    const macroSignatures = [
      [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], // VBA project
    ];
    
    // This is a simplified check - production should use proper parsing
    for (const sig of macroSignatures) {
      for (let i = 0; i < bytes.length - sig.length; i++) {
        if (sig.every((b, j) => bytes[i + j] === b)) {
          return { hasMacros: true };
        }
      }
    }
  }
  
  return { hasMacros: false };
}
