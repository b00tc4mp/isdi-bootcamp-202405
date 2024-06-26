{
    const hasLikedPost = (postId) => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

        const index = users.findIndex(user => user.username === sessionStorage.username);

        return users[index].likedPosts.some(id => id === postId);
    }

    logic.hasLikedPost = hasLikedPost;
}