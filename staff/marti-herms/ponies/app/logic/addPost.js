function addPost(img, text) {
    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    var date = new Date();
    var id = (Math.random() * 100).toString().concat(date.getTime());

    var post = { id: id, img: img, text: text }
    posts.unshift(post);

    localStorage.posts = JSON.stringify(posts);

    addPostButton.disabled = false;
}