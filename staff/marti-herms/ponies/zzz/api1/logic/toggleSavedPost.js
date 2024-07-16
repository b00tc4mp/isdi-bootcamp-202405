import data from '../data/index.js'

import validate from '../validate.js'

const toggleSavedPost = (username, postId) => {
    validate.username(username)
    validate.string(postId, 'postId')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    const postIndex = user.savedPosts.findIndex(id => id === postId)

    if (postIndex !== -1) {
        user.savedPosts.splice(postIndex, 1)
    } else {
        user.savedPosts.push(postId)
    }

    data.updateUser(user => user.username === username, user)
}

export default toggleSavedPost