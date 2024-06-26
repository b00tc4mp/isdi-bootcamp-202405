function removePostLike(postId) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    const index = users.findIndex(user => user.username === sessionStorage.username);

    const postIndex = users[index].likedPosts.findIndex(post => post.id === postId)

    users[index].likedPosts.splice(postIndex, 1);

    localStorage.users = JSON.stringify(users);
}