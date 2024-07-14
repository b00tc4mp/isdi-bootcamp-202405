import data from '../data'
import validate from '../validate'

function toggleLikePost(postId) {
    validate.postId(postId, 'postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    const index = post.likes.indexOf(sessionStorage.username)

    if (index < 0)
        post.likes.push(sessionStorage.username)
    else
        post.likes.splice(index, 1)

    data.updatePost(post => post.id === postId, post)

}

export default toggleLikePost
