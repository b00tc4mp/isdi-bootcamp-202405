function getAllPosts() {
    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    return posts.reverse()

}