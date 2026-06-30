#!/usr/bin/env python3
"""
Deep Consolidation Script
Merges integrationwise-os and apps/integrationwise-os into a single consolidated directory
Takes unique files from both, and for duplicates, takes the more complete version
"""

import os
import shutil
from pathlib import Path
from typing import Dict, Tuple

BASE_DIR = Path("/Users/nirmal/Github/13.1")
DIR1 = BASE_DIR / "integrationwise-os"  # Base/canonical
DIR2 = BASE_DIR / "apps/integrationwise-os"  # Apps directory
CONSOLIDATED = BASE_DIR / "integratewise-os-consolidated"

# Files to skip
SKIP_PATTERNS = ['node_modules', '.next', '.git', '__pycache__', '.DS_Store']
SKIP_FILES = ['next-env.d.ts', '.env.local', '.env.example']

def should_skip(path: str) -> bool:
    """Check if path should be skipped"""
    for pattern in SKIP_PATTERNS:
        if pattern in path:
            return True
    for skip_file in SKIP_FILES:
        if path.endswith(skip_file):
            return True
    return False

def get_all_files(directory: Path) -> Dict[str, Path]:
    """Get all code files from directory"""
    files = {}
    for root, dirs, filenames in os.walk(directory):
        # Filter out skipped directories
        dirs[:] = [d for d in dirs if not any(pattern in d for pattern in SKIP_PATTERNS)]
        
        for filename in filenames:
            # Only include code/config files
            if filename.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.sql', '.css', '.mjs', '.config.js', '.config.ts')):
                full_path = Path(root) / filename
                rel_path = os.path.relpath(full_path, directory)
                
                if not should_skip(rel_path):
                    files[rel_path] = full_path
    return files

def file_size_and_lines(path: Path) -> Tuple[int, int]:
    """Get file size and line count"""
    try:
        with open(path, 'rb') as f:
            content = f.read()
            size = len(content)
            lines = content.count(b'\n') + 1
            return size, lines
    except:
        return 0, 0

def choose_better_file(file1: Path, file2: Path) -> Path:
    """Choose the better version of duplicate files"""
    size1, lines1 = file_size_and_lines(file1)
    size2, lines2 = file_size_and_lines(file2)
    
    # Prefer file with more content (usually more complete)
    if lines2 > lines1 * 1.1:  # 10% more lines
        return file2
    elif lines1 > lines2 * 1.1:
        return file1
    else:
        # If similar, prefer DIR2 (apps) as it's more feature-complete
        return file2

def consolidate():
    """Main consolidation function"""
    print("🔍 Analyzing directories...")
    
    # Get all files
    files1 = get_all_files(DIR1)
    files2 = get_all_files(DIR2)
    
    print(f"  📁 integrationwise-os: {len(files1)} files")
    print(f"  📁 apps/integrationwise-os: {len(files2)} files")
    
    # Find unique and common
    unique_to_1 = set(files1.keys()) - set(files2.keys())
    unique_to_2 = set(files2.keys()) - set(files1.keys())
    common = set(files1.keys()) & set(files2.keys())
    
    print(f"\n  ✅ Unique to integrationwise-os: {len(unique_to_1)}")
    print(f"  ✅ Unique to apps/integrationwise-os: {len(unique_to_2)}")
    print(f"  🔄 Common files: {len(common)}")
    
    # Create consolidated directory structure
    print(f"\n📦 Creating consolidated directory...")
    CONSOLIDATED.mkdir(exist_ok=True)
    
    copied = {'unique_1': 0, 'unique_2': 0, 'common': 0}
    
    # Copy unique files from DIR1
    print(f"\n📋 Copying unique files from integrationwise-os...")
    for rel_path in unique_to_1:
        src = files1[rel_path]
        dst = CONSOLIDATED / rel_path
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        copied['unique_1'] += 1
    
    # Copy unique files from DIR2
    print(f"📋 Copying unique files from apps/integrationwise-os...")
    for rel_path in unique_to_2:
        src = files2[rel_path]
        dst = CONSOLIDATED / rel_path
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        copied['unique_2'] += 1
    
    # Handle common files - choose better version
    print(f"🔄 Processing common files (choosing best version)...")
    for rel_path in common:
        file1 = files1[rel_path]
        file2 = files2[rel_path]
        
        # Choose better file
        chosen = choose_better_file(file1, file2)
        
        dst = CONSOLIDATED / rel_path
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(chosen, dst)
        copied['common'] += 1
    
    # Summary
    total = copied['unique_1'] + copied['unique_2'] + copied['common']
    print(f"\n✅ Consolidation Complete!")
    print(f"  📊 Total files: {total}")
    print(f"     - From integrationwise-os (unique): {copied['unique_1']}")
    print(f"     - From apps/integrationwise-os (unique): {copied['unique_2']}")
    print(f"     - Common (best version): {copied['common']}")
    
    # Save manifest
    manifest_path = CONSOLIDATED / "CONSOLIDATION_MANIFEST.md"
    with open(manifest_path, 'w') as f:
        f.write("# Consolidation Manifest\n\n")
        f.write(f"**Created:** {Path.cwd()}\n\n")
        f.write(f"## Summary\n\n")
        f.write(f"- Total files: {total}\n")
        f.write(f"- Unique from integrationwise-os: {copied['unique_1']}\n")
        f.write(f"- Unique from apps/integrationwise-os: {copied['unique_2']}\n")
        f.write(f"- Common files (merged): {copied['common']}\n\n")
        f.write(f"## Unique Files from integrationwise-os\n\n")
        for rel_path in sorted(unique_to_1):
            f.write(f"- `{rel_path}`\n")
        f.write(f"\n## Unique Files from apps/integrationwise-os\n\n")
        for rel_path in sorted(list(unique_to_2)[:100]):  # First 100
            f.write(f"- `{rel_path}`\n")
        if len(unique_to_2) > 100:
            f.write(f"\n... and {len(unique_to_2) - 100} more files\n")
    
    print(f"\n📄 Manifest saved to: {manifest_path}")

if __name__ == "__main__":
    consolidate()
