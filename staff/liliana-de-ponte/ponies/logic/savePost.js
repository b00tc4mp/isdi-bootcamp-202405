function savePost(imageSource, description) {

    post = {
        src: imageSource,
        description: description
    }

    localStorage.posts = JSON.stringify(post)
}