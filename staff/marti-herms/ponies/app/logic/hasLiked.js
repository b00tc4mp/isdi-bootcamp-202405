function hasLiked(post_id) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    const index = users.findIndex(user => user.username === sessionStorage.username);

    return users[index].liked_posts.some(id => id === post_id);
}