import data from '../data/index.js'

import validate from '../validate.js'

const getUserPosts = (username) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    const posts = data.findPosts(post => user.yourPosts.includes(post.id))

    return posts.reverse()

}

export default getUserPosts