# Cherry-Pick Workflow Guide

This document explains how to use the automated cherry-pick workflow for migrating commits between branches and repositories.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Usage Examples](#usage-examples)
4. [Workflow Methods](#workflow-methods)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The cherry-pick workflow automates the process of applying specific commits from one branch to another. This is useful for:

- **Hotfixes**: Apply bug fixes to production branches
- **Feature backports**: Move features between branches
- **Repository sync**: Sync commits between GitHub and Bitbucket
- **Selective merges**: Choose specific commits instead of merging entire branches

---

## Quick Start

### Prerequisites

```bash
# Make the script executable
chmod +x scripts/cherry-pick-workflow.sh
```

### Basic Usage

```bash
# List commits to cherry-pick
./scripts/cherry-pick-workflow.sh list -s dev -t main

# Cherry-pick a single commit
./scripts/cherry-pick-workflow.sh pick -c abc123def -t main

# Interactive cherry-pick (recommended for beginners)
./scripts/cherry-pick-workflow.sh interactive -s dev -t main
```

---

## Usage Examples

### 1. List Commits Between Branches

See what commits exist in one branch but not another:

```bash
# List commits in 'dev' not in 'main'
./scripts/cherry-pick-workflow.sh list -s dev -t main

# List commits from remote branch
./scripts/cherry-pick-workflow.sh list -s origin/dev -t main
```

**Output:**
```
Commits to cherry-pick:
abc123 Fix critical bug in authentication
def456 Add new feature X
ghi789 Update documentation
Total commits to cherry-pick: 3
```

---

### 2. Cherry-Pick Single Commit

Apply a single commit to another branch:

```bash
# Cherry-pick commit abc123 to main branch
./scripts/cherry-pick-workflow.sh pick -c abc123 -t main

# Dry run (see what would happen without executing)
./scripts/cherry-pick-workflow.sh pick -c abc123 -t main --dry-run
```

---

### 3. Cherry-Pick Multiple Commits

Apply several commits at once:

```bash
# Cherry-pick multiple commits (comma-separated)
./scripts/cherry-pick-workflow.sh batch \
  -c abc123,def456,ghi789 \
  -t main

# Cherry-pick a range of commits
./scripts/cherry-pick-workflow.sh pick \
  -c abc123..def456 \
  -t main
```

**Note:** Range format (`abc123..def456`) cherry-picks all commits between (but not including) `abc123` and including `def456`.

---

### 4. Interactive Cherry-Pick

Choose commits interactively:

```bash
./scripts/cherry-pick-workflow.sh interactive -s dev -t main
```

This will:
1. Show you a numbered list of commits
2. Ask you to select which ones to cherry-pick
3. Apply only the selected commits

**Example:**
```
Commits available for cherry-pick:
1  abc123 Fix bug A
2  def456 Add feature B
3  ghi789 Update docs
4  jkl012 Fix bug C

Enter commit numbers to cherry-pick (comma-separated, e.g., 1,3,5): 1,4
Selected commits: abc123,jkl012
Proceed with cherry-pick? (y/n): y
```

---

### 5. Sync Between Remotes

Sync commits from GitHub to Bitbucket:

```bash
# Sync all commits from origin/dev to bitbucket/main
./scripts/cherry-pick-workflow.sh sync \
  -s origin/dev \
  -t bitbucket/main

# Sync between different remotes
./scripts/cherry-pick-workflow.sh sync \
  --from origin \
  --to bitbucket \
  -s dev \
  -t main
```

---

### 6. Abort Cherry-Pick

If something goes wrong during cherry-pick:

```bash
# Abort current cherry-pick operation
./scripts/cherry-pick-workflow.sh abort

# Or manually
git cherry-pick --abort
```

---

## Workflow Methods

### Method 1: Local Script (Recommended)

Use the shell script for local development:

```bash
./scripts/cherry-pick-workflow.sh [command] [options]
```

**Advantages:**
- ✅ Full control
- ✅ Interactive mode
- ✅ Works offline
- ✅ See changes before applying

---

### Method 2: GitHub Actions

Use GitHub Actions workflow for automated cherry-picks:

1. Go to **Actions** tab in GitHub
2. Select **Cherry-Pick Automation** workflow
3. Click **Run workflow**
4. Fill in:
   - Source branch
   - Target branch
   - Commit hashes
   - Remote (origin/bitbucket)

**Advantages:**
- ✅ Automated execution
- ✅ Accessible from anywhere
- ✅ Can trigger on events

**Limitations:**
- ❌ Requires GitHub access
- ❌ Less interactive

---

### Method 3: Bitbucket Pipelines

Use Bitbucket Pipelines for Bitbucket-specific automation:

```bash
# Trigger via pipeline variables
BITBUCKET_SOURCE_BRANCH=dev \
BITBUCKET_TARGET_BRANCH=main \
BITBUCKET_COMMITS=abc123,def456 \
bitbucket pipelines run cherry-pick
```

**Advantages:**
- ✅ Native Bitbucket integration
- ✅ Automated execution

---

## Best Practices

### 1. Always List First

Before cherry-picking, always list commits to see what will be applied:

```bash
./scripts/cherry-pick-workflow.sh list -s dev -t main
```

### 2. Use Dry Run

Test your command with `--dry-run` first:

```bash
./scripts/cherry-pick-workflow.sh pick -c abc123 -t main --dry-run
```

### 3. Commit Messages

Cherry-picked commits maintain their original commit messages. If needed, amend:

```bash
git cherry-pick abc123
git commit --amend -m "New commit message"
```

### 4. Handle Conflicts

If conflicts occur:

1. Resolve conflicts in your editor
2. Stage resolved files: `git add .`
3. Continue: `git cherry-pick --continue`

Or abort: `git cherry-pick --abort`

### 5. Verify After Cherry-Pick

Always verify the cherry-picked commits:

```bash
# See what was applied
git log --oneline -5

# Compare branches
git log main..dev
```

### 6. Push After Verification

Only push after verifying everything looks correct:

```bash
# Verify first
git log --oneline -5

# Then push
git push origin main
```

---

## Troubleshooting

### Issue: "Branch does not exist"

**Solution:**
```bash
# Create the branch first
git checkout -b target-branch

# Or fetch from remote
git fetch origin
git checkout origin/target-branch
```

### Issue: "Commit does not exist"

**Solution:**
```bash
# Fetch all branches and commits
git fetch origin --all

# Verify commit exists
git show abc123
```

### Issue: Merge Conflicts

**Solution:**
```bash
# See conflicted files
git status

# Resolve conflicts manually, then:
git add .
git cherry-pick --continue

# Or abort if needed
git cherry-pick --abort
```

### Issue: "Not a valid object"

**Solution:**
This means the commit hash is incorrect or doesn't exist in the current repository:

```bash
# Fetch all commits
git fetch origin --all

# Verify commit exists
git log --all | grep abc123
```

### Issue: Multiple Conflicts

**Solution:**
Resolve conflicts one at a time:

```bash
# Resolve and continue for each conflict
git add .
git cherry-pick --continue

# Repeat until all conflicts are resolved
```

---

## Advanced Usage

### Environment Variables

Set defaults via environment variables:

```bash
export CHERRY_PICK_SOURCE_REMOTE=origin
export CHERRY_PICK_TARGET_REMOTE=bitbucket
export CHERRY_PICK_LOG=.cherry-pick.log

./scripts/cherry-pick-workflow.sh pick -c abc123 -t main
```

### Cherry-Pick Without Committing

To cherry-pick but not commit (useful for review):

```bash
git cherry-pick --no-commit abc123
# Review changes
git commit  # or git cherry-pick --continue
```

### Cherry-Pick and Edit

Edit commits during cherry-pick:

```bash
# Cherry-pick with edit option
git cherry-pick -n abc123  # -n = --no-commit
# Make your edits
git commit --amend
```

---

## Related Commands

### Manual Cherry-Pick

If you prefer manual control:

```bash
# Single commit
git checkout target-branch
git cherry-pick abc123

# Multiple commits
git cherry-pick abc123 def456 ghi789

# Range
git cherry-pick abc123^..def456
```

### Other Useful Commands

```bash
# See commit details
git show abc123

# See what commits differ
git log branch1..branch2

# See commit history graph
git log --oneline --graph --all
```

---

## Summary

The cherry-pick workflow provides automated, safe, and interactive ways to move commits between branches and repositories. Start with `list` and `interactive` commands for safety, then use `pick` or `batch` for efficiency.

**Quick Reference:**
- `list` - See what will be cherry-picked
- `interactive` - Choose commits interactively
- `pick` - Cherry-pick specific commits
- `batch` - Cherry-pick multiple commits
- `sync` - Sync between remotes
- `abort` - Cancel current operation

---

**Questions?** Check the script help: `./scripts/cherry-pick-workflow.sh help`
