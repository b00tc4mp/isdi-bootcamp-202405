{
    const togglePostLike = (postID) => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

        const index = users.findIndex(user => user.username === sessionStorage.username);

        const postIndex = users[index].likedPosts.findIndex(id => id === postID)

        if (postIndex !== -1) {
            users[index].likedPosts.splice(postIndex, 1);
        } else {
            users[index].likedPosts.push(postID);
        }

        localStorage.users = JSON.stringify(users);
    }

    logic.togglePostLike = togglePostLike;
}