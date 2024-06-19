function editCaption(postId, newCaption) {
    if (postId.trim().length === 0) throw new Error('invalid postId')

    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    var postIndex = posts.findIndex(function (post) {
        return post.id === postId
    })

    if (postIndex < 0) throw new Error('post no found')

    posts[postIndex].caption = newCaption

    localStorage.posts = JSON.stringify(posts)
}