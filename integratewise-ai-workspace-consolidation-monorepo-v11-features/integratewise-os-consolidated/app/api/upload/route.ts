/**
 * FILE UPLOAD API - v11.0 Master Lock
 * 
 * Secure file upload endpoint with:
 * - MIME + extension validation
 * - Size limits
 * - Rate limiting
 * - Error boundaries
 * - Quarantine on failure
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  validateBatch,
  validateFile,
  checkRateLimit,
  RATE_LIMITS,
  sanitizeFilename,
  safeProcess,
  quarantineFile,
  type FileToValidate,
} from '@/lib/upload';

export const runtime = 'nodejs';
export const maxDuration = 30; // 30 second timeout

interface UploadResult {
  filename: string;
  success: boolean;
  error?: string;
  quarantined?: boolean;
  size?: number;
  type?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    const rateCheck = checkRateLimit(
      `upload:${clientIp}`,
      RATE_LIMITS.uploadsPerMinute,
      60000
    );
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
          errorCode: 'RATE_LIMITED',
          retryAfter: Math.ceil((rateCheck.resetAt - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': String(rateCheck.remaining),
            'X-RateLimit-Reset': String(rateCheck.resetAt)
          }
        }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided', errorCode: 'NO_FILES' },
        { status: 400 }
      );
    }

    // Convert to validation format
    const filesToValidate: FileToValidate[] = files.map(f => ({
      name: f.name,
      type: f.type,
      size: f.size
    }));

    // Validate batch
    const batchValidation = validateBatch(filesToValidate);
    if (!batchValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: batchValidation.error,
          errorCode: batchValidation.errorCode
        },
        { status: 400 }
      );
    }

    // Process each file
    const results: UploadResult[] = [];
    
    for (const file of files) {
      const sanitizedName = sanitizeFilename(file.name);
      
      // Validate individual file
      const validation = validateFile({
        name: file.name,
        type: file.type,
        size: file.size
      });
      
      if (!validation.valid) {
        results.push({
          filename: sanitizedName,
          success: false,
          error: validation.error,
          quarantined: false
        });
        continue;
      }

      // Process file with error boundary
      const processResult = await safeProcess(sanitizedName, async () => {
        const buffer = await file.arrayBuffer();
        
        // Here you would:
        // 1. Store file in cloud storage (S3, R2, etc.)
        // 2. Extract text/metadata
        // 3. Generate embeddings
        // 4. Store in Spine + IQ Hub
        
        // For now, return success
        return {
          filename: sanitizedName,
          size: file.size,
          type: file.type,
          storedAt: new Date().toISOString()
        };
      });

      if (processResult.success) {
        results.push({
          filename: sanitizedName,
          success: true,
          size: file.size,
          type: file.type
        });
      } else {
        results.push({
          filename: sanitizedName,
          success: false,
          error: processResult.error,
          quarantined: processResult.quarantined
        });
      }
    }

    // Summary
    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;
    const quarantinedCount = results.filter(r => r.quarantined).length;

    return NextResponse.json({
      success: failedCount === 0,
      message: `Processed ${successCount}/${files.length} files successfully`,
      summary: {
        total: files.length,
        successful: successCount,
        failed: failedCount,
        quarantined: quarantinedCount
      },
      results,
      rateLimit: {
        remaining: rateCheck.remaining,
        resetAt: rateCheck.resetAt
      }
    });

  } catch (error) {
    console.error('[UPLOAD] Unhandled error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred during upload',
        errorCode: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check upload limits and status
export async function GET(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';
  
  const rateCheck = checkRateLimit(
    `upload:${clientIp}`,
    RATE_LIMITS.uploadsPerMinute,
    60000
  );

  return NextResponse.json({
    limits: {
      maxFileSize: '10MB',
      maxBatchSize: '50MB',
      maxFilesPerBatch: 20,
      allowedTypes: [
        'PDF', 'DOCX', 'PPTX', 'XLSX',
        'MD', 'TXT', 'CSV', 'JSON',
        'PNG', 'JPG', 'WEBP', 'GIF'
      ]
    },
    rateLimit: {
      uploadsPerMinute: RATE_LIMITS.uploadsPerMinute,
      remaining: rateCheck.remaining,
      resetAt: rateCheck.resetAt
    }
  });
}
