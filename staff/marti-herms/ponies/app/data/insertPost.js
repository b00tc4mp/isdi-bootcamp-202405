function insertPost(post) {
    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    posts.unshift(post);

    localStorage.posts = JSON.stringify(posts);
}

export default insertPost;