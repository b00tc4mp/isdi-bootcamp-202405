import data from '../data/index.js'

import validate from '../validate.js'

const updatePostCaption = (postId, newCaption) => {
    validate.postId(postId)
    validate.string(newCaption)

    const post = data.findPost(post => post.id === postId)

    if (post === undefined) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption