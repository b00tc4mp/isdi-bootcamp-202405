import data from '../data/index.js'

import validate from '../validate.js'

const getFollowedUserPosts = (username) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    const posts = user.following.map(followed => data.findUser(user => user.username === followed).yourPosts).flat(Infinity)

    const followedPosts = data.findPosts(post => posts.includes(post.id))

    followedPosts.forEach(post => {
        post.fav = user.savedPosts.includes(post.id)
        post.like = post.likes.includes(username)

        post.author.following = user.following.includes(post.author.username)
    })

    return followedPosts.reverse()
}

export default getFollowedUserPosts