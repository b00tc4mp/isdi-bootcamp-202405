function editPost(id, newCaption) {
    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    var index = posts.findIndex(item => item.id === id);

    posts[index].caption = newCaption;

    localStorage.posts = JSON.stringify(posts);
}