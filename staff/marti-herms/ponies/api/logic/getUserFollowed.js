import data from '../data/index.js'

const getUserFollowed = (username) => {
    validateCallback.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    return user.following
}

export default getUserFollowed