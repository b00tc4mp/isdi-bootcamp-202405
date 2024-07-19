import data from '../data/index.js'

import validate from '../validate.js'

const getAllPosts = (username) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('user not found')

    const posts = data.findPosts(() => true)

    posts.forEach(post => {
        post.fav = user.savedPosts.includes(post.id)
        post.like = post.likes.includes(username)

        post.author.following = user.following.includes(post.author.username)
    })

    return posts.reverse()
}

export default getAllPosts