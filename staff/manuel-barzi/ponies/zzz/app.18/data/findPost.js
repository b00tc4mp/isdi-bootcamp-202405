{
    function findPost(condition) {
        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

        const post = posts.find(condition)

        return post || null
    }

    data.findPost = findPost
}