import data from '../data'

import validate from '../validate.js'

const deletePost = postId => {
    validate.postId(postId, 'postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    data.deletePost(post => post.id === postId)
}

export default deletePost
