import data from '../data'

import validate from '../validate.js'

const updatePostCaption = (username, postId, newCaption) => {
    validate.username(username)
    validate.postId(postId)

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption