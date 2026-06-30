#!/bin/bash

###############################################################################
# Cherry-Pick Workflow Script
# 
# This script automates cherry-picking commits between branches and repositories
# Usage: ./scripts/cherry-pick-workflow.sh [options]
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SOURCE_REMOTE="${CHERRY_PICK_SOURCE_REMOTE:-origin}"
TARGET_REMOTE="${CHERRY_PICK_TARGET_REMOTE:-bitbucket}"
LOG_FILE="${CHERRY_PICK_LOG:-.cherry-pick.log}"

###############################################################################
# Helper Functions
###############################################################################

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

###############################################################################
# Show Help
###############################################################################

show_help() {
    cat << EOF
Cherry-Pick Workflow Script

USAGE:
    ./scripts/cherry-pick-workflow.sh [COMMAND] [OPTIONS]

COMMANDS:
    pick          Cherry-pick commits from source to target branch
    list          List commits between branches
    batch         Cherry-pick multiple commits
    interactive   Interactive cherry-pick with commit selection
    sync          Sync commits from one remote to another
    abort         Abort current cherry-pick operation
    help          Show this help message

OPTIONS:
    -s, --source BRANCH      Source branch (default: current branch)
    -t, --target BRANCH      Target branch (required for pick/batch)
    -c, --commits COMMITS    Commit hashes (comma-separated or range)
    -f, --from REMOTE        Source remote (default: origin)
    -o, --to REMOTE          Target remote (default: bitbucket)
    -d, --dry-run            Show what would be done without executing
    -v, --verbose            Verbose output
    -h, --help               Show help

EXAMPLES:
    # List commits to cherry-pick
    ./scripts/cherry-pick-workflow.sh list -s dev -t main

    # Cherry-pick single commit
    ./scripts/cherry-pick-workflow.sh pick -c abc123 -t main

    # Cherry-pick commit range
    ./scripts/cherry-pick-workflow.sh pick -c abc123..def456 -t main

    # Batch cherry-pick multiple commits
    ./scripts/cherry-pick-workflow.sh batch -c abc123,def456,ghi789 -t main

    # Interactive cherry-pick
    ./scripts/cherry-pick-workflow.sh interactive -s dev -t main

    # Sync commits from GitHub to Bitbucket
    ./scripts/cherry-pick-workflow.sh sync -s origin/dev -t bitbucket/main

    # Dry run (see what would happen)
    ./scripts/cherry-pick-workflow.sh pick -c abc123 -t main --dry-run

ENVIRONMENT VARIABLES:
    CHERRY_PICK_SOURCE_REMOTE    Source remote (default: origin)
    CHERRY_PICK_TARGET_REMOTE    Target remote (default: bitbucket)
    CHERRY_PICK_LOG              Log file path (default: .cherry-pick.log)

EOF
}

###############################################################################
# List Commits Between Branches
###############################################################################

list_commits() {
    local source_branch="$1"
    local target_branch="$2"
    
    if [ -z "$target_branch" ]; then
        error "Target branch is required. Use: list -s SOURCE -t TARGET"
    fi
    
    log "Listing commits in '$source_branch' not in '$target_branch'..."
    
    # Check if branches exist
    if ! git show-ref --verify --quiet refs/heads/"$source_branch" && \
       ! git show-ref --verify --quiet refs/remotes/"$source_branch"; then
        error "Branch '$source_branch' does not exist"
    fi
    
    if ! git show-ref --verify --quiet refs/heads/"$target_branch" && \
       ! git show-ref --verify --quiet refs/remotes/"$target_branch"; then
        warn "Target branch '$target_branch' does not exist yet (will be created)"
    fi
    
    info "Commits to cherry-pick:"
    git log --oneline --graph --decorate "$target_branch".."$source_branch" 2>/dev/null || \
    git log --oneline --graph --decorate "$source_branch" --not "$target_branch" 2>/dev/null
    
    local count=$(git rev-list --count "$target_branch".."$source_branch" 2>/dev/null || \
                  git rev-list --count "$source_branch" --not "$target_branch" 2>/dev/null || echo "0")
    
    log "Total commits to cherry-pick: $count"
}

###############################################################################
# Cherry-Pick Single or Multiple Commits
###############################################################################

cherry_pick() {
    local commits="$1"
    local target_branch="$2"
    local dry_run="$3"
    
    if [ -z "$commits" ] || [ -z "$target_branch" ]; then
        error "Commits and target branch are required"
    fi
    
    # Checkout target branch
    log "Checking out target branch: $target_branch"
    if [ "$dry_run" != "true" ]; then
        if git show-ref --verify --quiet refs/heads/"$target_branch"; then
            git checkout "$target_branch"
        else
            warn "Target branch does not exist, creating it..."
            git checkout -b "$target_branch" 2>/dev/null || git checkout "$target_branch"
        fi
    else
        info "[DRY RUN] Would checkout: $target_branch"
    fi
    
    # Parse commits (support range or comma-separated)
    if [[ "$commits" == *".."* ]]; then
        # Range format: abc123..def456
        local start_commit=$(echo "$commits" | cut -d'.' -f1)
        local end_commit=$(echo "$commits" | cut -d'.' -f3)
        log "Cherry-picking commit range: $start_commit..$end_commit"
        
        if [ "$dry_run" != "true" ]; then
            git cherry-pick "$start_commit"^.."$end_commit" || {
                error "Cherry-pick failed. Resolve conflicts and run: git cherry-pick --continue"
            }
        else
            info "[DRY RUN] Would cherry-pick range: $start_commit..$end_commit"
            git log --oneline "$start_commit"^.."$end_commit"
        fi
    else
        # Comma-separated or single commit
        IFS=',' read -ra COMMIT_ARRAY <<< "$commits"
        for commit in "${COMMIT_ARRAY[@]}"; do
            commit=$(echo "$commit" | xargs)  # Trim whitespace
            
            # Verify commit exists
            if ! git cat-file -e "$commit" 2>/dev/null; then
                error "Commit '$commit' does not exist"
            fi
            
            log "Cherry-picking commit: $commit"
            
            if [ "$dry_run" != "true" ]; then
                git cherry-pick "$commit" || {
                    error "Cherry-pick failed for $commit. Resolve conflicts and run: git cherry-pick --continue"
                }
            else
                info "[DRY RUN] Would cherry-pick: $commit"
                git log --oneline -1 "$commit"
            fi
        done
    fi
    
    log "Cherry-pick completed successfully!"
}

###############################################################################
# Interactive Cherry-Pick
###############################################################################

interactive_pick() {
    local source_branch="$1"
    local target_branch="$2"
    
    if [ -z "$source_branch" ] || [ -z "$target_branch" ]; then
        error "Source and target branches are required"
    fi
    
    log "Interactive cherry-pick from '$source_branch' to '$target_branch'"
    
    # List commits
    local commits_file=$(mktemp)
    git log --oneline --reverse "$target_branch".."$source_branch" > "$commits_file" 2>/dev/null || \
    git log --oneline --reverse "$source_branch" --not "$target_branch" > "$commits_file" 2>/dev/null
    
    if [ ! -s "$commits_file" ]; then
        info "No commits to cherry-pick"
        rm "$commits_file"
        return
    fi
    
    info "Commits available for cherry-pick:"
    cat -n "$commits_file"
    
    echo ""
    read -p "Enter commit numbers to cherry-pick (comma-separated, e.g., 1,3,5): " selection
    
    # Extract selected commits
    local selected_commits=""
    IFS=',' read -ra NUMBERS <<< "$selection"
    for num in "${NUMBERS[@]}"; do
        num=$(echo "$num" | xargs)
        local commit_hash=$(sed -n "${num}p" "$commits_file" | cut -d' ' -f1)
        if [ -n "$commit_hash" ]; then
            selected_commits="$selected_commits$commit_hash,"
        fi
    done
    
    selected_commits="${selected_commits%,}"  # Remove trailing comma
    
    if [ -z "$selected_commits" ]; then
        error "No valid commits selected"
    fi
    
    rm "$commits_file"
    
    info "Selected commits: $selected_commits"
    read -p "Proceed with cherry-pick? (y/n): " confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        log "Cherry-pick cancelled"
        return
    fi
    
    cherry_pick "$selected_commits" "$target_branch" "false"
}

###############################################################################
# Sync Commits Between Remotes
###############################################################################

sync_commits() {
    local source_ref="$1"
    local target_ref="$2"
    
    if [ -z "$source_ref" ] || [ -z "$target_ref" ]; then
        error "Source and target refs are required (e.g., origin/dev bitbucket/main)"
    fi
    
    local source_remote=$(echo "$source_ref" | cut -d'/' -f1)
    local source_branch=$(echo "$source_ref" | cut -d'/' -f2-)
    local target_remote=$(echo "$target_ref" | cut -d'/' -f1)
    local target_branch=$(echo "$target_ref" | cut -d'/' -f2-)
    
    log "Syncing commits from $source_ref to $target_ref"
    
    # Fetch from both remotes
    log "Fetching from $source_remote..."
    git fetch "$source_remote"
    
    log "Fetching from $target_remote..."
    git fetch "$target_remote"
    
    # Checkout target branch
    if git show-ref --verify --quiet refs/remotes/"$target_remote/$target_branch"; then
        git checkout -b "$target_branch" "$target_remote/$target_branch" 2>/dev/null || \
        git checkout "$target_branch"
    else
        log "Creating new branch: $target_branch"
        git checkout -b "$target_branch"
    fi
    
    # Find commits to cherry-pick
    local commits_to_pick=$(git rev-list --reverse "$target_remote/$target_branch".."$source_remote/$source_branch" 2>/dev/null || \
                           git rev-list --reverse "$source_remote/$source_branch" --not "$target_remote/$target_branch" 2>/dev/null)
    
    if [ -z "$commits_to_pick" ]; then
        info "No commits to sync"
        return
    fi
    
    local count=$(echo "$commits_to_pick" | wc -l | xargs)
    log "Found $count commits to sync"
    
    # Cherry-pick each commit
    echo "$commits_to_pick" | while read commit; do
        log "Cherry-picking: $(git log --oneline -1 "$commit")"
        git cherry-pick "$commit" || {
            error "Cherry-pick failed for $commit. Resolve conflicts and run: git cherry-pick --continue"
        }
    done
    
    log "Sync completed! Push with: git push $target_remote $target_branch"
}

###############################################################################
# Abort Cherry-Pick
###############################################################################

abort_cherry_pick() {
    if [ -f ".git/CHERRY_PICK_HEAD" ]; then
        log "Aborting cherry-pick..."
        git cherry-pick --abort
        log "Cherry-pick aborted"
    else
        info "No cherry-pick in progress"
    fi
}

###############################################################################
# Main Script
###############################################################################

main() {
    local command="${1:-help}"
    shift || true
    
    # Parse options
    local source_branch=""
    local target_branch=""
    local commits=""
    local dry_run="false"
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -s|--source)
                source_branch="$2"
                shift 2
                ;;
            -t|--target)
                target_branch="$2"
                shift 2
                ;;
            -c|--commits)
                commits="$2"
                shift 2
                ;;
            -f|--from)
                SOURCE_REMOTE="$2"
                shift 2
                ;;
            -o|--to)
                TARGET_REMOTE="$2"
                shift 2
                ;;
            -d|--dry-run)
                dry_run="true"
                shift
                ;;
            -v|--verbose)
                set -x
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                error "Unknown option: $1"
                ;;
        esac
    done
    
    # Execute command
    case "$command" in
        pick)
            cherry_pick "$commits" "$target_branch" "$dry_run"
            ;;
        list)
            list_commits "${source_branch:-HEAD}" "$target_branch"
            ;;
        batch)
            cherry_pick "$commits" "$target_branch" "$dry_run"
            ;;
        interactive)
            interactive_pick "${source_branch:-HEAD}" "$target_branch"
            ;;
        sync)
            sync_commits "${source_branch:-$SOURCE_REMOTE/HEAD}" "${target_branch:-$TARGET_REMOTE/HEAD}"
            ;;
        abort)
            abort_cherry_pick
            ;;
        help|*)
            show_help
            ;;
    esac
}

# Run main function
main "$@"
