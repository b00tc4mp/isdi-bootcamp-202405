function findPosts(condition) {
    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    const foundPosts = posts.filter(condition)

    return foundPosts
}

export default findPosts
