{
    const toggleLikePost = (postId) => {

        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []
        const user = users.find(user => user.username === sessionStorage.username)

        if (user.username === undefined) throw new Error('User not found')

        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []
        const post = posts.find(post => post.id === postId)

        if (post === undefined) throw new Error('post not found')

        const usernameIndex = post.likeUsers.findIndex((username) => username === user.username)

        if (usernameIndex !== -1)
            post.likeUsers.splice(usernameIndex, 1)

        else
            post.likeUsers.push(user.username)

        localStorage.posts = JSON.stringify(posts)
    }

    logic.toggleLikePost = toggleLikePost
}