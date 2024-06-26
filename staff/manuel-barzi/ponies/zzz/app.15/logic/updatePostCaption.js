function updatePostCaption(postId, newCaption) {
    if (postId.trim().length === 0) throw new Error('invalid postId')

    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    var post = posts.find(function (post) {
        return post.id === postId
    })

    if (post === undefined) throw new Error('post not found')

    post.caption = newCaption

    localStorage.posts = JSON.stringify(posts)
}