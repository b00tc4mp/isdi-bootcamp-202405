#!/bin/zsh

# status_all_branches.sh
# version 2.3
# author: Eduard Hernández - trosdesuru
# GitHub: https://github.com/trosdesuru

# Color definitions
GREEN=$(tput setaf 2)
RED=$(tput setaf 1)
WHITE=$(tput setaf 7)
LIGHTGREY=$(tput setaf 7; tput dim)
RESET=$(tput sgr0)

# Function to display a progress bar
progress_bar() {
    local current=$1
    local total=$2
    local progress=$((current * 100 / total))
    local completed=$((progress / 2))
    local remaining=$((50 - completed))

    printf -v bar "%${completed}s" ""
    bar=${bar// /#}
    printf -v spaces "%${remaining}s" ""
    echo -ne "\r[${bar}${spaces}] ${progress}%%"
}

# Function to clear the current line in the terminal
clear_line() {
    echo -ne "\r\033[K"
}

# Get the list of all local and remote branches
branches=$(git branch -a --list '*')
total_branches=$(echo "$branches" | wc -l)
current_branch=0

# Clear screen before starting
tput clear

# Iterate over each branch and get its status
while IFS= read -r branch; do
    current_branch=$((current_branch + 1))
    branch_status=""

    if [[ $branch == remotes/upstream/* ]]; then
        remote_branch=${branch#remotes/upstream/}
        branch_status="Remote branch: $remote_branch"
    elif [[ $branch == remotes/origin/* ]]; then
        remote_branch=${branch#remotes/origin/}
        branch_status="Remote branch: $remote_branch"
    elif [[ $branch == origin/* ]]; then
        local_branch=${branch#origin/}
        branch_status="Local branch: $local_branch"
    else
        branch_status="Local branch: $branch"
    fi

    # Check if there are any uncommitted changes
    if ! git diff --quiet; then
        echo -e "\r${RED}Uncommitted changes exist. Commit or stash changes before continuing.${RESET}"; exit 1
    fi

    echo -ne "${WHITE}Fetching status for ${GREEN}${branch_status}${WHITE}...${RESET}"

    # Checkout the branch and fetch status
    git checkout "$branch" &>/dev/null
    git ls-tree -r HEAD --name-only &> /tmp/status.txt

    # Check if the status command was successful
    if [[ $? -eq 0 ]]; then
        echo -ne "\r${WHITE}Fetched status for ${GREEN}${branch_status}${RESET}"
        while IFS= read -r file; do
            echo -ne "\r${LIGHTGREY}$file${RESET} "; clear_line
        done < /tmp/status.txt
        echo -ne "\r"; clear_line
    else
        echo -e "\r${RED}Failed to fetch status for ${branch_status}${RESET}"
    fi

    # Display progress bar
    progress_bar $current_branch $total_branches

    # Sleep to simulate the task duration (can be removed in actual usage)
    sleep 1

done <<< "$branches"

# Inform the user that the status retrieval is complete
echo -e "\n${GREEN}Status retrieval for all branches completed.${RESET}"
