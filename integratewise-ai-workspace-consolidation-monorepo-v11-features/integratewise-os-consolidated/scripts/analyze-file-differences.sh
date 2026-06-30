#!/bin/bash

###############################################################################
# File Difference Analysis After Cherry-Pick Workflow
# 
# Analyzes file-level differences between branches to understand
# what files would change after cherry-picking operations
###############################################################################

set -e

OUTPUT_DIR="analysis"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILE_DIFF_REPORT="$OUTPUT_DIR/file_differences_$TIMESTAMP.md"

mkdir -p "$OUTPUT_DIR"

log() {
    echo -e "\033[0;32m[$(date +'%H:%M:%S')]\033[0m $1"
}

info() {
    echo -e "\033[0;34m[INFO]\033[0m $1"
}

cat > "$FILE_DIFF_REPORT" << EOF
# File Differences Analysis - Cherry-Pick Workflow Impact

**Generated:** $(date)
**Purpose:** Identify file-level differences between branches after cherry-pick operations

---

## Summary

This report analyzes file differences between branches to understand what files would be affected by cherry-picking operations.

---

## File Count Comparison

| Branch | File Count |
|--------|------------|
EOF

# Get file counts
for branch in main dev dev-consolidated-app; do
    if git show-ref --verify --quiet "refs/heads/$branch"; then
        count=$(git ls-tree -r --name-only "$branch" 2>/dev/null | wc -l | xargs)
        echo "| \`$branch\` | $count |" >> "$FILE_DIFF_REPORT"
    fi
done

cat >> "$FILE_DIFF_REPORT" << EOF

---

## Main vs Dev Branch File Differences

### Statistics
EOF

# Main vs Dev
if git show-ref --verify --quiet refs/heads/main && git show-ref --verify --quiet refs/heads/dev; then
    added=$(git diff --name-status main dev | grep "^A" | wc -l | xargs)
    modified=$(git diff --name-status main dev | grep "^M" | wc -l | xargs)
    deleted=$(git diff --name-status main dev | grep "^D" | wc -l | xargs)
    
    cat >> "$FILE_DIFF_REPORT" << EOF
- **Added:** $added files
- **Modified:** $modified files
- **Deleted:** $deleted files
- **Total Changes:** $((added + modified + deleted)) files

### Added Files (A)
\`\`\`
EOF
    git diff --name-status main dev | grep "^A" | sed 's/^A[[:space:]]*//' | head -30 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
    
    cat >> "$FILE_DIFF_REPORT" << EOF

### Modified Files (M)
\`\`\`
EOF
    git diff --name-status main dev | grep "^M" | sed 's/^M[[:space:]]*//' | head -30 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
    
    cat >> "$FILE_DIFF_REPORT" << EOF

### Deleted Files (D)
\`\`\`
EOF
    git diff --name-status main dev | grep "^D" | sed 's/^D[[:space:]]*//' | head -30 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
fi

cat >> "$FILE_DIFF_REPORT" << EOF

---

## Main vs Dev-Consolidated-App File Differences

### Statistics
EOF

# Main vs Dev-Consolidated-App
if git show-ref --verify --quiet refs/heads/main && git show-ref --verify --quiet refs/heads/dev-consolidated-app; then
    added=$(git diff --name-status main dev-consolidated-app | grep "^A" | wc -l | xargs)
    modified=$(git diff --name-status main dev-consolidated-app | grep "^M" | wc -l | xargs)
    deleted=$(git diff --name-status main dev-consolidated-app | grep "^D" | wc -l | xargs)
    
    cat >> "$FILE_DIFF_REPORT" << EOF
- **Added:** $added files
- **Modified:** $modified files
- **Deleted:** $deleted files
- **Total Changes:** $((added + modified + deleted)) files

### Added Files (A)
\`\`\`
EOF
    git diff --name-status main dev-consolidated-app | grep "^A" | sed 's/^A[[:space:]]*//' | head -50 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
    
    cat >> "$FILE_DIFF_REPORT" << EOF

### Modified Files (M)
\`\`\`
EOF
    git diff --name-status main dev-consolidated-app | grep "^M" | sed 's/^M[[:space:]]*//' | head -50 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
    
    cat >> "$FILE_DIFF_REPORT" << EOF

### Deleted Files (D)
\`\`\`
EOF
    git diff --name-status main dev-consolidated-app | grep "^D" | sed 's/^D[[:space:]]*//' | head -50 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
fi

cat >> "$FILE_DIFF_REPORT" << EOF

---

## Dev vs Dev-Consolidated-App File Differences

### Statistics
EOF

# Dev vs Dev-Consolidated-App
if git show-ref --verify --quiet refs/heads/dev && git show-ref --verify --quiet refs/heads/dev-consolidated-app; then
    added=$(git diff --name-status dev dev-consolidated-app | grep "^A" | wc -l | xargs)
    modified=$(git diff --name-status dev dev-consolidated-app | grep "^M" | wc -l | xargs)
    deleted=$(git diff --name-status dev dev-consolidated-app | grep "^D" | wc -l | xargs)
    
    cat >> "$FILE_DIFF_REPORT" << EOF
- **Added:** $added files
- **Modified:** $modified files
- **Deleted:** $deleted files
- **Total Changes:** $((added + modified + deleted)) files

### Added Files (A)
\`\`\`
EOF
    git diff --name-status dev dev-consolidated-app | grep "^A" | sed 's/^A[[:space:]]*//' | head -50 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
    
    cat >> "$FILE_DIFF_REPORT" << EOF

### Modified Files (M)
\`\`\`
EOF
    git diff --name-status dev dev-consolidated-app | grep "^M" | sed 's/^M[[:space:]]*//' | head -50 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
    
    cat >> "$FILE_DIFF_REPORT" << EOF

### Deleted Files (D)
\`\`\`
EOF
    git diff --name-status dev dev-consolidated-app | grep "^D" | sed 's/^D[[:space:]]*//' | head -50 >> "$FILE_DIFF_REPORT"
    echo "\`\`\`" >> "$FILE_DIFF_REPORT"
fi

cat >> "$FILE_DIFF_REPORT" << EOF

---

## Key File Categories

### Configuration Files
EOF

# Find config files
echo "### Modified Configuration Files" >> "$FILE_DIFF_REPORT"
echo "\`\`\`" >> "$FILE_DIFF_REPORT"
git diff --name-status main dev-consolidated-app | grep "^M" | grep -E "(config|json|yml|yaml|env)" | sed 's/^M[[:space:]]*//' | head -20 >> "$FILE_DIFF_REPORT" || echo "None" >> "$FILE_DIFF_REPORT"
echo "\`\`\`" >> "$FILE_DIFF_REPORT"

cat >> "$FILE_DIFF_REPORT" << EOF

### Source Code Files
EOF

echo "### Modified Source Files" >> "$FILE_DIFF_REPORT"
echo "\`\`\`" >> "$FILE_DIFF_REPORT"
git diff --name-status main dev-consolidated-app | grep "^M" | grep -E "\.(ts|tsx|js|jsx)$" | sed 's/^M[[:space:]]*//' | head -30 >> "$FILE_DIFF_REPORT" || echo "None" >> "$FILE_DIFF_REPORT"
echo "\`\`\`" >> "$FILE_DIFF_REPORT"

cat >> "$FILE_DIFF_REPORT" << EOF

### Documentation Files
EOF

echo "### Modified Documentation" >> "$FILE_DIFF_REPORT"
echo "\`\`\`" >> "$FILE_DIFF_REPORT"
git diff --name-status main dev-consolidated-app | grep -E "^(A|M|D)" | grep -E "\.(md|txt)$" | sed 's/^[AMD][[:space:]]*//' | head -30 >> "$FILE_DIFF_REPORT" || echo "None" >> "$FILE_DIFF_REPORT"
echo "\`\`\`" >> "$FILE_DIFF_REPORT"

cat >> "$FILE_DIFF_REPORT" << EOF

---

**Report Generated:** $(date)
EOF

log "File difference analysis complete!"
info "Report saved to: $FILE_DIFF_REPORT"
