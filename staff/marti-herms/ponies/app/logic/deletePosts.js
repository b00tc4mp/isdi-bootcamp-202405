function deletePosts(id) {
    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    var index;

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
            index = i;
        }
    }

    posts.splice(index, 1);

    localStorage.posts = JSON.stringify(posts);

    window.location.reload();
}