function editPost(id, newCaption) {
    var posts = getAllPosts();

    var index = posts.findIndex(item => item.id === id);

    posts[index].caption = newCaption;

    setAllPosts(posts);
}