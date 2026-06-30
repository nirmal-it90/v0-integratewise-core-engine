# Cherry-Pick Quick Reference Card

## 🚀 Quick Commands

```bash
# Make script executable (first time only)
chmod +x scripts/cherry-pick-workflow.sh

# List commits between branches
./scripts/cherry-pick-workflow.sh list -s dev -t main

# Cherry-pick single commit
./scripts/cherry-pick-workflow.sh pick -c abc123 -t main

# Cherry-pick multiple commits
./scripts/cherry-pick-workflow.sh batch -c abc123,def456 -t main

# Interactive cherry-pick (recommended)
./scripts/cherry-pick-workflow.sh interactive -s dev -t main

# Sync from GitHub to Bitbucket
./scripts/cherry-pick-workflow.sh sync -s origin/dev -t bitbucket/main

# Dry run (see what would happen)
./scripts/cherry-pick-workflow.sh pick -c abc123 -t main --dry-run

# Abort current cherry-pick
./scripts/cherry-pick-workflow.sh abort
```

## 📝 Common Workflows

### Hotfix to Production
```bash
# 1. List commits in hotfix branch
./scripts/cherry-pick-workflow.sh list -s hotfix/fix-bug -t main

# 2. Cherry-pick to main
./scripts/cherry-pick-workflow.sh pick -c <commit-hash> -t main

# 3. Push
git push origin main
```

### Feature Backport
```bash
# Interactive mode lets you choose which commits
./scripts/cherry-pick-workflow.sh interactive -s feature/new-feature -t release/v1.0
```

### Sync Between Remotes
```bash
# Sync all commits from GitHub dev to Bitbucket main
./scripts/cherry-pick-workflow.sh sync -s origin/dev -t bitbucket/main
```

## 🔧 Handling Conflicts

```bash
# If conflicts occur:
1. Resolve conflicts in your editor
2. git add .
3. git cherry-pick --continue

# Or abort:
git cherry-pick --abort
```

## 📚 Full Documentation

See `docs/CHERRY_PICK_WORKFLOW.md` for complete guide.
