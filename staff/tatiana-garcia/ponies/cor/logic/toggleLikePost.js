import data from '../data/index.js'
import validate from '../../app/validate.js'

function toggleLikePost(username, postId) {
    validate.username(username, 'username')
    validate.postId(postId, 'postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    const index = post.likes.indexOf(username)

    if (index < 0)
        post.likes.push(username)
    else
        post.likes.splice(index, 1)

    data.updatePost(post => post.id === postId, post)

}

export default toggleLikePost
