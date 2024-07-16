import data from '../data'

const togglePostLike = (postID) => {
    if (postID.trim().length === 0) throw new Error('invalid postId')

    const post = data.findPost(post => post.id === postID)

    if (post === null) {
        throw new Error('post not found')
    }

    const index = post.likes.indexOf(sessionStorage.username)

    if (index < 0) {
        post.likes.push(sessionStorage.username)
    } else {
        post.likes.splice(index, 1)
    }

    data.updatePost(post => post.id === postID, post)


    const user = data.findUser(user => user.username === sessionStorage.username)

    const postIndex = user.likedPosts.findIndex(id => id === postID)

    if (postIndex !== -1) {
        user.likedPosts.splice(postIndex, 1)
    } else {
        user.likedPosts.push(postID)
    }

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default togglePostLike