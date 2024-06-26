function addPostLike(postId) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    const index = users.findIndex(user => user.username === sessionStorage.username);

    users[index].likedPosts.push(postId);

    localStorage.users = JSON.stringify(users);
}