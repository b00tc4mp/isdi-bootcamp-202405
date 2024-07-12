import data from '../data/index.js'

const updatePostCaption = (username, postId, newCaption) => {
    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('User not found')

    if (postId.trim().length === 0) throw new Error('invalid postId')

    const post = data.findPost(post => post.id === postId)

    if (post === undefined) throw new Error('post not found')

    post.caption = newCaption

    data.updatePost(post => post.id === postId, post)
}

export default updatePostCaption