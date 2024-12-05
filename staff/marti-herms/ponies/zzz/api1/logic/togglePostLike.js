import data from '../data/index.js'

import validate from '../validate.js'

const togglePostLike = (username, postId) => {
    validate.username(username)
    validate.string(postId, 'postId')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    if (postId.trim().length === 0) throw new Error('invalid postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null) {
        throw new Error('post not found')
    }

    const index = post.likes.indexOf(username)

    if (index < 0) {
        post.likes.push(username)
    } else {
        post.likes.splice(index, 1)
    }

    data.updatePost(post => post.id === postId, post)

    const postIndex = user.likedPosts.findIndex(id => id === postId)

    if (postIndex !== -1) {
        user.likedPosts.splice(postIndex, 1)
    } else {
        user.likedPosts.push(postId)
    }

    data.updateUser(user => user.username === username, user)
}

export default togglePostLike