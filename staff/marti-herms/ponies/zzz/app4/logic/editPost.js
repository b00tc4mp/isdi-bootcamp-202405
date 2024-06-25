function editPost(id, newCaption) {
    if (id.trim().length === 0) {
        throw new Error('invalid postId')
    }

    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    const post = posts.find(item => item.id === id);

    if (post === undefined) {
        throw new Error('post not found')
    }

    post.caption = newCaption;

    localStorage.posts = JSON.stringify(posts);
}