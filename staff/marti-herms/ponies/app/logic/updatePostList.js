function updatePostList() {
    var posts = getAllPosts();

    while (postListSection.children.length > 0) {
        var child = postListSection.children[0];

        postListSection.removeChild(child);
    }

    generatePostList(posts, postListSection);
}