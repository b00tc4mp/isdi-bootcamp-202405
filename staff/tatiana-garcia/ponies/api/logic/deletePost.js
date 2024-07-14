import data from '../data/index.js'

import validate from '../validate.js'

const deletePost = (username, postId) => {
    validate.username(username)
    validate.postId(postId)

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('user not found')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    data.deletePost(post => post.id === postId)
}

export default deletePost
