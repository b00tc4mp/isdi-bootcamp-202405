{
    function updatePost(condition, post) {
        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

        const postIndex = posts.findIndex(condition)

        if (postIndex > -1) {
            posts.splice(postIndex, 1, post)

            localStorage.posts = JSON.stringify(posts)
        }
    }

    data.updatePost = updatePost
}