#!/bin/zsh

# Configuration
remote_repo="https://github.com/trosdesuru/isdi-bootcamp-202405.git"
remote_name="origin"
local_branches=("develop" "feature/playground" "feature/ponies" "main")
verbose=false

# Color definitions
GREEN="\033[32m"
RED="\033[31m"
BLUE="\033[34m"
YELLOW="\033[33m"
RESET="\033[0m"

# Function to check the existence and status of the remote repository
check_remote_repo() {
    echo -e "${BLUE}Checking if the remote repository exists and is accessible...${RESET}"
    if git ls-remote "$remote_repo" HEAD &>/dev/null; then
        echo -e "${GREEN}Remote repository found and accessible.${RESET}"
        return 0
    else
        echo -e "${RED}Error: Remote repository not found or empty.${RESET}"
        return 1
    fi
}

# Function to check for uncommitted changes
check_for_uncommitted_changes() {
    if ! git diff-index --quiet HEAD --; then
        echo -e "${RED}Error: You have uncommitted changes. Please commit or stash them before running this script.${RESET}"
        return 1
    fi
    return 0
}

# Function to display a progress bar
progress_bar() {
    local current=$1
    local total=$2
    local message=$3
    local progress=$((current * 100 / total))
    local completed=$((progress / 2))
    local remaining=$((50 - completed))

    printf -v bar "%${completed}s" ""
    bar=${bar// /#}
    printf -v spaces "%${remaining}s" ""
    echo -ne "\r[${bar}${spaces}] ${progress}%% - ${message}"
    if [[ $current -eq $total ]]; then
        echo -ne "\n"
    fi
}

# Function to update all local branches with the remote version
update_branches() {
    echo -e "${BLUE}Fetching updates from the remote repository...${RESET}"
    if ! git fetch $remote_name &>/dev/null; then
        echo -e "${RED}Error: Failed to fetch from remote repository.${RESET}"
        return 1
    fi

    total_branches=${#local_branches[@]}
    current_branch=0

    for local_branch in "${local_branches[@]}"; do
        echo -e "${BLUE}Checking if branch '$local_branch' exists locally...${RESET}"
        if ! git show-ref --verify --quiet refs/heads/$local_branch; then
            echo -e "${YELLOW}Warning: Branch '$local_branch' does not exist locally. Skipping.${RESET}"
            continue
        fi

        echo -e "${BLUE}Switching to branch '$local_branch'...${RESET}"
        if ! git checkout $local_branch &>/dev/null; then
            echo -e "${RED}Error: Failed to switch to branch '$local_branch'.${RESET}"
            continue
        fi
        echo -e "${GREEN}Successfully switched to branch '$local_branch'.${RESET}"

        echo -e "${BLUE}Pulling latest changes for branch '$local_branch' from remote repository...${RESET}"
        if ! git pull $remote_name $local_branch &>/dev/null; then
            echo -e "${RED}Error: Failed to pull changes for branch '$local_branch'.${RESET}"
            continue
        fi
        echo -e "${GREEN}Successfully pulled changes for branch '$local_branch'.${RESET}"

        current_branch=$((current_branch + 1))
        progress_bar $current_branch $total_branches "Updating branch: $local_branch"
    done

    echo -e "${GREEN}All local branches have been updated.${RESET}"
}

# Parse arguments
while getopts "v" opt; do
    case $opt in
        v) verbose=true ;;
        *) echo -e "${RED}Invalid option${RESET}"; exit 1 ;;
    esac
done

# Execute the synchronization process
clear
echo -e "${BLUE}Starting synchronization process...${RESET}"
if check_remote_repo; then
    if check_for_uncommitted_changes; then
        echo -e "${BLUE}Updating local branches...${RESET}"
        update_branches
    else
        echo -e "${RED}Failed to synchronize due to uncommitted changes.${RESET}"
    fi
else
    echo -e "${RED}Failed to synchronize due to issues with the remote repository.${RESET}"
fi
