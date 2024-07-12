function updatePosts(posts) {
    const oldPosts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    posts.forEach(post => {
        const index = oldPosts.findIndex(oldPost => oldPost.id === post.id)
        if (index !== -1) {
            oldPosts.splice(index, 1, post)
        }
    })

    localStorage.posts = JSON.stringify(oldPosts)
}

export default updatePosts