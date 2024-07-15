import data from '../data'

import validate from '../validate.js'

function toggleFavPost(username, postId) {
    validate.username(username)
    validate.postId(postId)

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null)
        throw new Error('user not found')

    const post = data.findPost(post => post.id === postId)

    if (post === null)
        throw new Error('post not found')

    const index = user.favs.indexOf(postId)

    if (index < 0)
        user.favs.push(postId)
    else
        user.favs.splice(index, 1)

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default toggleFavPost
