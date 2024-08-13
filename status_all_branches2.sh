#!/bin/zsh

# status_all_branches.sh
# version 1.5

# Color definitions
GREEN="\033[32m"
RED="\033[31m"
WHITE="\033[37m"
LIGHTGREY="\033[37;2m"
RESET="\033[0m"

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

# Get the list of all local and remote branches
branches=$(git branch -a --list '*')
total_branches=$(echo "$branches" | wc -l)
current_branch=0

# Summary of tasks
summary=""

# Iterate over each branch and get its status
while IFS= read -r branch; do
    current_branch=$((current_branch + 1))
    branch_status=""

    if [[ $branch == remotes/upstream/* ]]; then
        remote_branch=${branch#remotes/upstream/}
        branch_status="Remote branch: $remote_branch"
        echo -e "${WHITE}Fetching status for remote branch: ${GREEN}$remote_branch${WHITE}...${RESET}"
        git checkout "$remote_branch" &>/dev/null
        git ls-tree -r HEAD --name-only &> /tmp/status.txt
    elif [[ $branch == remotes/origin/* ]]; then
        remote_branch=${branch#remotes/origin/}
        branch_status="Remote branch: $remote_branch"
        echo -e "${WHITE}Fetching status for remote branch: ${GREEN}$remote_branch${WHITE}...${RESET}"
        git checkout "$remote_branch" &>/dev/null
        git ls-tree -r HEAD --name-only &> /tmp/status.txt
    elif [[ $branch == origin/* ]]; then
        local_branch=${branch#origin/}
        branch_status="Local branch: $local_branch"
        echo -e "${WHITE}Fetching status for local branch: ${GREEN}$local_branch${WHITE}...${RESET}"
        git checkout "$local_branch" &>/dev/null
        git ls-tree -r HEAD --name-only &> /tmp/status.txt
    else
        branch_status="Local branch: $branch"
        echo -e "${WHITE}Fetching status for local branch: ${GREEN}$branch${WHITE}...${RESET}"
        git checkout "$branch" &>/dev/null
        git ls-tree -r HEAD --name-only &> /tmp/status.txt
    fi

    # Check if the status command was successful
    if [[ $? -eq 0 ]]; then
        echo -e "${WHITE}Fetched status for ${branch_status}${RESET}"
        cat /tmp/status.txt | while IFS= read -r file; do
            echo -e "${LIGHTGREY}$file${RESET}"
        done
        summary+="${LIGHTGREY}Fetched status for ${branch_status}\n${RESET}"
    else
        echo -e "${RED}Failed to fetch status for ${branch_status}${RESET}"
        summary+="${RED}Failed to fetch status for ${branch_status}\n${RESET}"
    fi

    # Display progress bar
    progress_bar $current_branch $total_branches

    # Sleep to simulate the task duration (can be removed in actual usage)
    sleep 1

    # Clear the 5 lines for next update
    for i in {1..5}; do
        echo -ne "\033[F\033[K"
    done
done <<< "$branches"

# Inform the user that the status retrieval is complete
echo -e "${GREEN}Status retrieval for all branches completed.${RESET}"

# Display the summary of tasks
echo -e "\n${WHITE}Summary of tasks:${RESET}"
echo -e "$summary"
