import data from '../data/index.js'

import validate from '../validate.js'

const deletePost = postId => {
    validate.postId(postId)

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('Post not found')

    data.deletePost(post => post.id === postId)
}

export default deletePost