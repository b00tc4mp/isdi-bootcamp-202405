function updateUsers(id) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    users.forEach((user) => {
        user.yourPosts = user.yourPosts.filter(postId => postId !== id);
        user.likedPosts = user.likedPosts.filter(postId => postId !== id);
        user.savedPosts = user.savedPosts.filter(postId => postId !== id);
    });

    localStorage.users = JSON.stringify(users);
}

export default updateUsers;