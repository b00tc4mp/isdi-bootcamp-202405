import data from '../data/index.js'

import validate from '../validate.js'

const getAllPosts = (username) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    const posts = data.findPosts(() => true)

    return posts.reverse()
}

export default getAllPosts