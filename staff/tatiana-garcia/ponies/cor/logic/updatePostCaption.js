import data from '../data/index.js'
import validate from '../../app/validate.js'

const updatePostCaption = (username, postId, newCaption) => {
    validate.username(username, 'username')
    validate.postId(postId, 'postId')

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('user not found')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption
