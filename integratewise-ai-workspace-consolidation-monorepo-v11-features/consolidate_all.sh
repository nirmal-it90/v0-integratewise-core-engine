#!/bin/bash
set -e

BASE_DIR="/Users/nirmal/Github/13.1"
NEW_DIR="$BASE_DIR/integratewise-os-consolidated"
SOURCE1="$BASE_DIR/integrationwise-os"
SOURCE2="$BASE_DIR/apps/integrationwise-os"

echo "=== INTEGRATEWISE OS CONSOLIDATION ==="
echo "Source 1 (integrationwise-os): $SOURCE1"
echo "Source 2 (apps/integrationwise-os): $SOURCE2"
echo "Target: $NEW_DIR"
echo ""

# Step 1: Start with SOURCE2 as base (more comprehensive)
echo "📦 Step 1: Copying base from apps/integrationwise-os..."
rsync -av --exclude='node_modules' --exclude='.next' --exclude='.git' \
  "$SOURCE2/" "$NEW_DIR/" 2>/dev/null || cp -r "$SOURCE2"/* "$NEW_DIR/" 2>/dev/null

echo "✅ Base copied"
echo ""

# Step 2: Cherry-pick unique files from SOURCE1
echo "🔍 Step 2: Finding unique files in integrationwise-os..."

# Function to check if file exists and is different
check_and_copy() {
  local src_file="$1"
  local rel_path="${src_file#$SOURCE1/}"
  local dest_file="$NEW_DIR/$rel_path"
  local dest_dir=$(dirname "$dest_file")
  
  # Create destination directory
  mkdir -p "$dest_dir"
  
  # If file doesn't exist in destination, copy it
  if [ ! -f "$dest_file" ]; then
    cp "$src_file" "$dest_file"
    echo "  ✅ NEW: $rel_path"
    return 0
  fi
  
  # If files are different, keep both (rename source version)
  if ! cmp -s "$src_file" "$dest_file" 2>/dev/null; then
    local backup_name="${dest_file%.*}_from_integrationwise-os.${dest_file##*.}"
    cp "$src_file" "$backup_name"
    echo "  ⚠️  DIFFERENT: $rel_path (saved as ${backup_name##*/})"
    return 1
  fi
  
  # Files are identical, skip
  return 2
}

# Find all files in SOURCE1 and process them
find "$SOURCE1" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.json" -o -name "*.md" -o -name "*.sql" \) \
  ! -path "*/node_modules/*" ! -path "*/.next/*" ! -path "*/.git/*" | while read -r file; do
  check_and_copy "$file"
done

echo ""
echo "✅ Consolidation complete!"
echo "📁 New directory: $NEW_DIR"
