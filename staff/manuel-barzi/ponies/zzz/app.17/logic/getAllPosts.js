{
    const getAllPosts = () => {
        const posts = data.findPosts(post => true)

        return posts.reverse()
    }

    logic.getAllPosts = getAllPosts
}