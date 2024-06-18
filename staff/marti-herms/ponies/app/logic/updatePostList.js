function updatePostList() {
    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    while (postListSection.children.length > 0) {
        var child = postListSection.children[0];

        postListSection.removeChild(child);
    }

    generatePostList(posts, postListSection);
}