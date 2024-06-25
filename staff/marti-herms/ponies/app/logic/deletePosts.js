function deletePosts(id) {
    if (id.trim().length === 0) {
        throw new Error('invalid postId');
    }
    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    const index = posts.findIndex(item => item.id === id);

    if (index < 0) {
        throw new Error('post not found');
    }

    posts.splice(index, 1);

    localStorage.posts = JSON.stringify(posts);

    const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

    users.forEach((user) => {
        user.liked_posts = user.liked_posts.filter(post_id => post_id !== id)
    });

    localStorage.users = JSON.stringify(users);
}