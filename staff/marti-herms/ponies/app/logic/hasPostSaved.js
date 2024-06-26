{
    const hasPostSaved = (postId) => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

        const index = users.findIndex(user => user.username === sessionStorage.username);

        return users[index].savedPosts.some(id => id === postId);
    }

    logic.hasPostSaved = hasPostSaved;
}