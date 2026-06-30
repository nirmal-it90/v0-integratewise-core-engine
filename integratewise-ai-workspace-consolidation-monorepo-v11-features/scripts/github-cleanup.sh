#!/bin/bash
# GitHub Branch Cleanup Script
# Archives old branches and prepares for consolidation

set -e

REPO_DIR="/Users/nirmal/Github/13.1/integratewise-ai-workspace"

cd "$REPO_DIR"

echo "🧹 GitHub Branch Cleanup"
echo "========================"

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# List all remote branches
echo ""
echo "📋 Remote branches:"
git branch -r | head -20

# List all local branches
echo ""
echo "📋 Local branches:"
git branch | head -20

echo ""
echo "⚠️  Manual cleanup required:"
echo ""
echo "1. Merge feature branches into main:"
echo "   git checkout main"
echo "   git merge cursor/mono-repo-github-audit-implementation"
echo ""
echo "2. Archive old branches (create archive branch):"
echo "   git branch archive/old-branches"
echo ""
echo "3. Delete merged branches:"
echo "   git branch -d <branch-name>  # Local"
echo "   git push origin --delete <branch-name>  # Remote"
echo ""
echo "4. Update default branch to 'main' in GitHub settings"
echo ""
echo "5. Protect 'main' branch:"
echo "   - Require pull request reviews"
echo "   - Require status checks to pass"
echo "   - Require branches to be up to date"
