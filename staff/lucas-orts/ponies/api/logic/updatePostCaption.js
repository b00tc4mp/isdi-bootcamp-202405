import data from '../data/index.js'
import validate from '../validate.js'

const updatePostCaption = (username, postId, newCaption) => {
    validate.username(username)
    validate.postId(postId)
    validate.string(newCaption)

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('user not found')

    if (postId.trim().length === 0) throw new Error('invalid postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption