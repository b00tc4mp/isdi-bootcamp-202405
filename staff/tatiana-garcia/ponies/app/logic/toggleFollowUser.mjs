import data from '../data/index.mjs'

function toggleFollowUser(postId) {

    if (postId.trim().length === 0) throw new Error('invalid postId')

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null) {
        throw new Error('user not found')
    }

    const post = data.findPost(post => post.id === postId)

    if (post === null) {
        throw new Error('post not found')
    }

    const index = user.following.indexOf(postId)

    const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    if (user.following.includes(post.author)) {


        user.following.splice(index, 1)

    } else {

        user.following.push(post.author)
    }

    data.updateUser(user => user.username === sessionStorage.username, user)

}

export default toggleFollowUser