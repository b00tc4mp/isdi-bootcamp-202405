import data from '../data/index.js'

import validate from '../validate.js'

const getUserPosts = (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('user not found')

    const targetUser = data.findUser(user => user.username === targetUsername)

    if (!targetUser) throw new Error('target user not found')

    const posts = data.findPosts(post => targetUser.yourPosts.includes(post.id))

    posts.forEach(post => {
        post.fav = user.savedPosts.includes(post.id)
        post.like = post.likes.includes(username)

        post.author.following = user.following.includes(post.author.username)
    })

    return posts.reverse()

}

export default getUserPosts