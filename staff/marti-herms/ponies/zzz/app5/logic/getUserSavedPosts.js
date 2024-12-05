{
    const getUserSavedPosts = () => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

        const index = users.findIndex(user => user.username === sessionStorage.username);

        return users[index].savedPosts;
    }

    logic.getUserSavedPosts = getUserSavedPosts;
}