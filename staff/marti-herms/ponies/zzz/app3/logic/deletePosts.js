function deletePosts(id) {
    if (id.trim().length === 0) {
        throw new Error('invalid postId');
    }
    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    var index = posts.findIndex(item => item.id === id);

    if (index < 0) {
        throw new Error('post not found');
    }

    posts.splice(index, 1);

    localStorage.posts = JSON.stringify(posts);
}