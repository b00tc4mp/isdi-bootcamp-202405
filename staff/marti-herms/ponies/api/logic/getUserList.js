import data from '../data/index.js'

import validate from '../validate.js'

const getUserList = (username) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    if (user === null) {
        throw new Error('user not found')
    }

    const users = data.findUsers(() => true)

    const usernames = users.map(user => user.username)

    return usernames
}

export default getUserList