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


    return followedPosts.reverse()
}

export default getFollowedUserPosts