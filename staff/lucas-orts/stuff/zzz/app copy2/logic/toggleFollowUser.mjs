import data from "../data/index.mjs"

function toggleFollowUser(username) {

    if (username.trim().length === 0) throw new Error('Invalid username')

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null)
        throw new Error('User not found')

    const following = data.findUser(user => user.username)

    if (!following)
        throw new Error('following user not found')

    const index = user.following.indexOf(username)

    if (index !== -1)
        user.following.splice(index, 1)
    else
        user.following.push(post.author)

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default toggleFollowUser