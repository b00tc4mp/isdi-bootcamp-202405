{
    const toggleSavedPost = (postID) => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

        const index = users.findIndex(user => user.username === sessionStorage.username);

        const postIndex = users[index].savedPosts.findIndex(id => id === postID);

        if (postIndex !== -1) {
            users[index].savedPosts.splice(postIndex, 1);
        } else {
            users[index].savedPosts.push(postID);
        }

        localStorage.users = JSON.stringify(users);
    }

    logic.toggleSavedPost = toggleSavedPost;
}