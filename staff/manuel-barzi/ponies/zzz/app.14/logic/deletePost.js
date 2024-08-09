function deletePost(postId) {
    if (postId.trim().length === 0) throw new Error('invalid postId')

    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    var postIndex = posts.findIndex(function (post) {
        return post.id === postId
    })

    if (postIndex < 0) throw new Error('post not found')

    posts.splice(postIndex, 1)

    localStorage.posts = JSON.stringify(posts)
}