import data from '../data'
import validate from '../validate'

const updatePostCaption = (postId, newCaption) => {
    validate.postId(postId, 'postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption
