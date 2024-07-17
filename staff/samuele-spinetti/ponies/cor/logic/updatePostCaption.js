import data from '../data/index.js'

import validate from '../validate.js'

const updatePostCaption = (username, postId, newCaption) => {
    validate.username(username)
    validate.postId(postId)
    validate.string(newCaption)

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('User not found')

    const post = data.findPost(post => post.id === postId)

    if (post === undefined) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption