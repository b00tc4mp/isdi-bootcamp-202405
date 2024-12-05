import data from '../data/index.js'

import validate from '../validate.js'

const getUserName = (username, targetUsername) => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('user not found')

    const targetUser = data.findUser(user => user.username === targetUsername)

    if (!targetUser) throw new Error('target user not found')

    return targetUser.name
}

export default getUserName