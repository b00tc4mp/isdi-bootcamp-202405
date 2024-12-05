import data from '../data/index.js'

import validate from '../validate.js'

const getUser = (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('user not found')

    const targetUser = data.findUser(user => user.username === targetUsername)

    if (!targetUser) throw new Error('target user not found')

    delete targetUser.password

    return targetUser
}

export default getUser