function addLike(post_id) {
    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    const index = users.findIndex(user => user.username === sessionStorage.username);

    users[index].liked_posts.push(post_id);

    localStorage.users = JSON.stringify(users);
}