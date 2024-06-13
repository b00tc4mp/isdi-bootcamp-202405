function savePost(imageSource, description) {

    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    var post = {
        src: imageSource,
        description: description
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}