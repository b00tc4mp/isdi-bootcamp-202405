function getAllPosts() {
    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    return posts;
}