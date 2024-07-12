function deletePost(condition) {
    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1)

        localStorage.posts = JSON.stringify(posts)
    }
}

export default deletePost