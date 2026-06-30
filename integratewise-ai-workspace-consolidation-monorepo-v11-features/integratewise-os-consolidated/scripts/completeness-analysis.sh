#!/bin/bash

###############################################################################
# Completeness Analysis - RevoDev Style
# 
# Comprehensive analysis of commits, differences, and completeness
###############################################################################

set -e

OUTPUT_DIR="analysis"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
COMPLETENESS_REPORT="$OUTPUT_DIR/completeness_analysis_$TIMESTAMP.md"

mkdir -p "$OUTPUT_DIR"

log() {
    echo -e "\033[0;32m[$(date +'%H:%M:%S')]\033[0m $1"
}

info() {
    echo -e "\033[0;34m[INFO]\033[0m $1"
}

cat > "$COMPLETENESS_REPORT" << 'EOF'
# Complete Commit Difference & Completeness Analysis

**Generated:** $(date)
**Method:** RevoDev Comprehensive Analysis

---

## Executive Summary

This report provides a complete analysis of:
1. All commits across all branches
2. Differences between key branches
3. Completeness assessment
4. Missing or incomplete features
5. Recommendations for consolidation

---

EOF

# Generate the report
{
    echo "## 1. Repository Overview"
    echo ""
    echo "### Statistics"
    echo "- Total Commits: $(git rev-list --all --count)"
    echo "- Total Branches: $(git branch -a | wc -l | xargs)"
    echo "- Total Files: $(git ls-files | wc -l | xargs)"
    echo "- Total Authors: $(git log --format='%aN' | sort -u | wc -l | xargs)"
    echo ""
    
    echo "## 2. Key Branch Comparisons"
    echo ""
    
    # Main vs Dev
    if git show-ref --verify --quiet refs/heads/main && git show-ref --verify --quiet refs/heads/dev; then
        echo "### Main vs Dev Branch"
        echo ""
        echo "**Commits in dev not in main:** $(git rev-list --count main..dev)"
        echo "**Commits in main not in dev:** $(git rev-list --count dev..main)"
        echo ""
        echo "#### Unique Commits in Dev:"
        echo "\`\`\`"
        git log --oneline main..dev | head -30
        echo "\`\`\`"
        echo ""
    fi
    
    # Main vs Dev-Consolidated-App
    if git show-ref --verify --quiet refs/heads/main && git show-ref --verify --quiet refs/heads/dev-consolidated-app; then
        echo "### Main vs Dev-Consolidated-App Branch"
        echo ""
        echo "**Commits in dev-consolidated-app not in main:** $(git rev-list --count main..dev-consolidated-app)"
        echo "**Commits in main not in dev-consolidated-app:** $(git rev-list --count dev-consolidated-app..main)"
        echo ""
        echo "#### Unique Commits in Dev-Consolidated-App:"
        echo "\`\`\`"
        git log --oneline main..dev-consolidated-app | head -30
        echo "\`\`\`"
        echo ""
        
        echo "#### File Differences:"
        echo "\`\`\`"
        git diff --name-status main dev-consolidated-app | head -50
        echo "\`\`\`"
        echo ""
    fi
    
    echo "## 3. Commit-by-Commit Analysis"
    echo ""
    echo "### Recent Commits (Last 100)"
    echo ""
    echo "| Commit | Author | Date | Message | Branch |"
    echo "|--------|--------|------|---------|--------|"
    
    # Get commits from all branches
    git log --all --oneline --decorate -100 | while read line; do
        hash=$(echo "$line" | awk '{print $1}')
        message=$(echo "$line" | sed 's/^[^ ]* //' | sed 's/ ([^)]*)$//')
        author=$(git show -s --format='%an' "$hash" 2>/dev/null || echo "Unknown")
        date=$(git show -s --format='%ai' "$hash" 2>/dev/null | cut -d' ' -f1)
        branch=$(echo "$line" | grep -o '([^)]*)$' | sed 's/[()]//g' | head -1)
        
        echo "| \`${hash:0:8}\` | $author | $date | ${message:0:60}... | $branch |"
    done
    
    echo ""
    echo "## 4. Feature Completeness"
    echo ""
    
    echo "### Code Quality Indicators"
    echo ""
    
    # Check for TODOs
    echo "- TODO Comments: $(find . -type f -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' 2>/dev/null | xargs grep -l 'TODO\|FIXME' 2>/dev/null | wc -l | xargs || echo "0")"
    echo "- Test Files: $(find . -type f -name '*.test.*' -o -name '*.spec.*' 2>/dev/null | wc -l | xargs || echo "0")"
    echo "- API Routes: $(find app/api -type f -name 'route.ts' 2>/dev/null | wc -l | xargs || echo "0")"
    echo "- Components: $(find components -type f -name '*.tsx' 2>/dev/null | wc -l | xargs || echo "0")"
    echo "- Pages: $(find app -type f -name 'page.tsx' 2>/dev/null | wc -l | xargs || echo "0")"
    echo ""
    
    echo "### Essential Components Check"
    echo ""
    
    components=(
        "app/layout.tsx:Main Layout"
        "app/page.tsx:Home Page"
        "components/app-shell.tsx:App Shell"
        "lib/supabase/client.ts:Supabase Client"
        "middleware.ts:Middleware"
        "package.json:Package Config"
        "tsconfig.json:TypeScript Config"
        "next.config.mjs:Next.js Config"
    )
    
    for component in "${components[@]}"; do
        file=$(echo "$component" | cut -d':' -f1)
        name=$(echo "$component" | cut -d':' -f2)
        if [ -f "$file" ]; then
            echo "✅ $name exists"
        else
            echo "❌ $name MISSING"
        fi
    done
    
    echo ""
    echo "## 5. Branch Completeness Matrix"
    echo ""
    echo "| Branch | Commits | Latest Commit | Status |"
    echo "|--------|---------|---------------|--------|"
    
    for branch in main dev dev-consolidated-app; do
        if git show-ref --verify --quiet "refs/heads/$branch"; then
            commits=$(git rev-list --count "$branch" 2>/dev/null || echo "0")
            latest=$(git log -1 --oneline "$branch" 2>/dev/null | awk '{print $1}')
            date=$(git log -1 --format='%ai' "$branch" 2>/dev/null | cut -d' ' -f1)
            
            # Determine status
            if [ "$branch" = "dev-consolidated-app" ]; then
                status="✅ Consolidated"
            elif [ "$branch" = "main" ]; then
                status="📦 Production"
            else
                status="🔄 Development"
            fi
            
            echo "| \`$branch\` | $commits | \`${latest:0:8}\` ($date) | $status |"
        fi
    done
    
    echo ""
    echo "## 6. Recommendations"
    echo ""
    echo "### Consolidation Status"
    
    if git show-ref --verify --quiet refs/heads/dev-consolidated-app; then
        echo "- ✅ Dev-Consolidated-App branch exists with latest consolidation"
        echo "- ⚠️  Review differences between main and dev-consolidated-app"
        echo "- 💡 Consider merging dev-consolidated-app into main if validated"
    fi
    
    echo ""
    echo "### Missing Items"
    echo "- Review TODO/FIXME comments for incomplete features"
    echo "- Verify all API routes are functional"
    echo "- Check for missing environment variables"
    echo "- Validate all components are properly exported"
    
    echo ""
    echo "---"
    echo "**Report Generated:** $(date)"
    echo "**Analysis Method:** RevoDev Comprehensive Analysis"
    
} | sed "s/\$(date)/$(date)/" >> "$COMPLETENESS_REPORT"

log "Completeness analysis complete!"
echo ""
info "Report saved to: $COMPLETENESS_REPORT"
echo ""
info "Quick Stats:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total Commits: $(git rev-list --all --count)"
echo "Total Branches: $(git branch -a | wc -l | xargs)"
echo "Total Files: $(git ls-files | wc -l | xargs)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
