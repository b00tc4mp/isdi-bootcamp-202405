import data from '../data/index.js'

import validate from '../validate.js'

const getUserAvatar = (username) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    return user.avatar
}

export default getUserAvatar