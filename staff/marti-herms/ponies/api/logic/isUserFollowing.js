import data from '../data/index.js'

import validate from '../validate.js'

const isUserFollowing = (username, author) => {
    validate.username(username)
    validate.username(author, 'author')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    return user.following.some(username => username === author)
}

export default isUserFollowing