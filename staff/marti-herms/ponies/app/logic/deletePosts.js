function deletePosts(id) {
    var posts = getAllPosts();

    var index = posts.findIndex(item => item.id === id);

    posts.splice(index, 1);

    setAllPosts(posts);
}