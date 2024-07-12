import data from '../data/index.js'

import validate from '../validate.js'

function toggleFavPost(postId) {
    validate.postId(postId)

    const user = data.findUser(user => user.username == sessionStorage.username)

    if (user === null) throw new Error('User not found')

    const post = data.findPost(post => post.id === postId)

    if (post === null) throw new Error('Post not found')

    const index = user.favs.indexOf(postId)

    if (index < 0)
        user.favs.push(postId)
    else
        user.favs.splice(index, 1)

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default toggleFavPost