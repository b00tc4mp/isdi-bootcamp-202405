function removeLike(post_id) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    const index = users.findIndex(user => user.username === sessionStorage.username);

    const post_index = users[index].liked_posts.findIndex(post => post.id === post_id)

    users[index].liked_posts.splice(post_index, 1);

    localStorage.users = JSON.stringify(users);
}