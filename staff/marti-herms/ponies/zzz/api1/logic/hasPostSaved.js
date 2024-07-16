import data from '../data/index.js'

import validate from '../validate.js'

const hasPostSaved = (username, postId) => {
    validate.username(username)
    validate.string(postId, 'postId')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    return user.savedPosts.some(id => id === postId)
}

export default hasPostSaved