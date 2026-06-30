#!/bin/bash

###############################################################################
# Commit Difference Analyzer
# 
# Analyzes differences between commits, branches, and identifies completeness
# Usage: ./scripts/analyze-commit-differences.sh [options]
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

OUTPUT_DIR="analysis"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="$OUTPUT_DIR/commit_analysis_$TIMESTAMP.md"

###############################################################################
# Helper Functions
###############################################################################

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

###############################################################################
# Initialize Report
###############################################################################

init_report() {
    mkdir -p "$OUTPUT_DIR"
    cat > "$REPORT_FILE" << EOF
# Commit Difference Analysis Report

**Generated:** $(date)
**Repository:** $(git remote get-url origin 2>/dev/null || echo "Local repository")

---

## Executive Summary

EOF
}

append_report() {
    echo "$1" >> "$REPORT_FILE"
}

###############################################################################
# Analyze Single Commit
###############################################################################

analyze_commit() {
    local commit=$1
    local author=$(git show -s --format='%an' "$commit")
    local date=$(git show -s --format='%ai' "$commit")
    local message=$(git show -s --format='%s' "$commit")
    local files_changed=$(git diff-tree --no-commit-id --name-only -r "$commit" | wc -l | xargs)
    local insertions=$(git show --stat "$commit" | grep "insertion" | awk '{print $4}' || echo "0")
    local deletions=$(git show --stat "$commit" | grep "deletion" | awk '{print $6}' || echo "0")
    
    local files=$(git diff-tree --no-commit-id --name-only -r "$commit" | head -10 | tr '\n' ', ' | sed 's/,$//')
    
    echo "| $commit | $author | $date | $message | $files_changed | +$insertions/-$deletions |"
}

###############################################################################
# Compare Two Branches
###############################################################################

compare_branches() {
    local branch1=$1
    local branch2=$2
    
    log "Comparing branches: $branch1 vs $branch2"
    
    append_report "\n## Branch Comparison: $branch1 vs $branch2\n"
    
    # Commits in branch1 not in branch2
    local commits_only_in_1=$(git log --oneline "$branch2".."$branch1" 2>/dev/null | wc -l | xargs)
    local commits_only_in_2=$(git log --oneline "$branch1".."$branch2" 2>/dev/null | wc -l | xargs)
    
    append_report "### Commit Statistics"
    append_report "- Commits only in \`$branch1\`: **$commits_only_in_1**"
    append_report "- Commits only in \`$branch2\`: **$commits_only_in_2**"
    
    # Files changed
    local files_diff=$(git diff --name-status "$branch2".."$branch1" 2>/dev/null | wc -l | xargs)
    append_report "- Files changed: **$files_diff**\n"
    
    # List unique commits
    append_report "### Commits Only in $branch1\n"
    append_report "| Commit | Author | Date | Message | Files | Changes |"
    append_report "|--------|--------|------|---------|-------|---------|"
    
    git log --oneline "$branch2".."$branch1" 2>/dev/null | while read line; do
        local hash=$(echo "$line" | awk '{print $1}')
        analyze_commit "$hash"
    done >> "$REPORT_FILE"
    
    append_report "\n### Commits Only in $branch2\n"
    append_report "| Commit | Author | Date | Message | Files | Changes |"
    append_report "|--------|--------|------|---------|-------|---------|"
    
    git log --oneline "$branch1".."$branch2" 2>/dev/null | while read line; do
        local hash=$(echo "$line" | awk '{print $1}')
        analyze_commit "$hash"
    done >> "$REPORT_FILE"
}

###############################################################################
# Analyze All Commits
###############################################################################

analyze_all_commits() {
    log "Analyzing all commits..."
    
    append_report "\n## Complete Commit Analysis\n"
    append_report "### Commit Statistics\n"
    
    local total_commits=$(git rev-list --all --count)
    local total_authors=$(git log --format='%aN' | sort -u | wc -l | xargs)
    local total_files=$(git ls-files | wc -l | xargs)
    
    append_report "- Total Commits: **$total_commits**"
    append_report "- Total Authors: **$total_authors**"
    append_report "- Total Files: **$total_files**"
    
    append_report "\n### Recent Commits (Last 50)\n"
    append_report "| Commit | Author | Date | Message | Files | Changes |"
    append_report "|--------|--------|------|---------|-------|---------|"
    
    git log --all --oneline -50 | while read line; do
        local hash=$(echo "$line" | awk '{print $1}')
        analyze_commit "$hash"
    done >> "$REPORT_FILE"
}

###############################################################################
# Find Incomplete Features
###############################################################################

find_incomplete_features() {
    log "Searching for incomplete features..."
    
    append_report "\n## Incomplete Features Analysis\n"
    
    # Search for TODO, FIXME, XXX, HACK comments
    local todos=$(git grep -i "TODO\|FIXME\|XXX\|HACK" --all --no-color | wc -l | xargs)
    
    append_report "### Code Annotations"
    append_report "- TODO/FIXME/XXX/HACK comments: **$todos**"
    
    # Find files with incomplete patterns
    append_report "\n### Files with TODO/FIXME Comments\n"
    append_report "\`\`\`\n"
    git grep -l -i "TODO\|FIXME" --all | head -20 >> "$REPORT_FILE"
    append_report "\`\`\`\n"
    
    # Check for incomplete implementations
    append_report "\n### Potential Incomplete Implementations\n"
    
    # Find placeholder functions
    local placeholders=$(git grep -i "placeholder\|stub\|not implemented\|coming soon" --all | wc -l | xargs)
    append_report "- Placeholder/stub implementations: **$placeholders**"
}

###############################################################################
# Analyze File Differences
###############################################################################

analyze_file_differences() {
    log "Analyzing file differences..."
    
    append_report "\n## File Difference Analysis\n"
    
    # Get all branches
    local branches=$(git branch -a | grep -v HEAD | sed 's/remotes\///' | sort -u)
    
    append_report "### Files Unique to Each Branch\n"
    
    for branch in $branches; do
        branch=$(echo "$branch" | xargs | sed 's/\* //')
        if [ "$branch" = "HEAD" ]; then continue; fi
        
        info "Analyzing branch: $branch"
        
        local branch_files=$(git ls-tree -r --name-only "$branch" 2>/dev/null | wc -l | xargs)
        append_report "- \`$branch\`: **$branch_files** files"
    done
}

###############################################################################
# Completeness Check
###############################################################################

completeness_check() {
    log "Performing completeness check..."
    
    append_report "\n## Completeness Assessment\n"
    
    # Check for missing dependencies
    if [ -f "package.json" ]; then
        append_report "### Dependencies"
        local dep_count=$(cat package.json | grep -c "\".*\":" || echo "0")
        append_report "- Package.json dependencies: **$dep_count**"
    fi
    
    # Check for configuration files
    append_report "\n### Configuration Files"
    local configs=("tsconfig.json" "next.config.mjs" "tailwind.config.ts" ".env.example")
    for config in "${configs[@]}"; do
        if [ -f "$config" ]; then
            append_report "✅ \`$config\` exists"
        else
            append_report "❌ \`$config\` missing"
        fi
    done
    
    # Check for essential directories
    append_report "\n### Essential Directories"
    local dirs=("app" "components" "lib" "public" "scripts")
    for dir in "${dirs[@]}"; do
        if [ -d "$dir" ]; then
            local file_count=$(find "$dir" -type f | wc -l | xargs)
            append_report "✅ \`$dir/\` exists ($file_count files)"
        else
            append_report "❌ \`$dir/\` missing"
        fi
    done
}

###############################################################################
# Generate Diff Summary
###############################################################################

generate_diff_summary() {
    log "Generating diff summary..."
    
    append_report "\n## Detailed Diff Summary\n"
    
    # Compare main branches
    if git show-ref --verify --quiet refs/heads/main && \
       git show-ref --verify --quiet refs/heads/dev; then
        compare_branches "main" "dev"
    fi
    
    # Compare with consolidated branch
    if git show-ref --verify --quiet refs/heads/dev-consolidated-app; then
        if git show-ref --verify --quiet refs/heads/main; then
            compare_branches "dev-consolidated-app" "main"
        fi
    fi
}

###############################################################################
# Main Execution
###############################################################################

main() {
    log "Starting commit difference analysis..."
    
    init_report
    
    # Run all analyses
    analyze_all_commits
    find_incomplete_features
    analyze_file_differences
    completeness_check
    generate_diff_summary
    
    # Summary
    append_report "\n## Summary\n"
    append_report "Analysis completed at $(date)"
    append_report "\n**Report saved to:** \`$REPORT_FILE\`"
    
    log "Analysis complete! Report saved to: $REPORT_FILE"
    
    # Display summary
    echo ""
    info "Quick Summary:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    git log --all --oneline | wc -l | xargs echo "Total commits:"
    git branch -a | wc -l | xargs echo "Total branches:"
    git ls-files | wc -l | xargs echo "Total files:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Full report: $REPORT_FILE"
}

main "$@"
