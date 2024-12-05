import data from '../data/index.js'

import validate from '../validate.js'

const getUserPostNumber = (username) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    return user.yourPosts.length
}

export default getUserPostNumber