import data from '../data/index.js'

import validate from '../validate.js'

const deletePost = (username, id) => {
    validate.username(username)
    validate.string(id, 'id')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    if (!user.yourPosts.includes(id)) {
        throw new Error('post is not from user')
    }

    data.deletePost(post => post.id === id)

    data.removePostFromUsers(id)
}

export default deletePost