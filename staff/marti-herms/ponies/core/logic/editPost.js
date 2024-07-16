import data from '../data/index.js'

import validate from '../validate.js'

const editPost = (username, id, newCaption) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    if (!user.yourPosts.includes(id)) {
        throw new Error('post is not from user')
    }

    const post = data.findPost(item => item.id === id)

    if (post === undefined) {
        throw new Error('post not found')
    }

    if (post.caption !== newCaption) {
        post.caption = newCaption

        data.updatePost(post => post.id === id, post)
    }
}

export default editPost