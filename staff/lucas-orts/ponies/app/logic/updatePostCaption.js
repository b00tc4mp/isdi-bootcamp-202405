import data from '../data'
import validate from '../validate.js'

const updatePostCaption = (postId, newCaption) => {
    validate.postId(postId)
    validate.string(newCaption)

    if (postId.trim().length === 0) throw new Error('invalid postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption