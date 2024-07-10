import data from '../data/index.mjs'

function toggleFollowUser(username) {

    if (!username.trim().length) throw new Error('Invalid username')

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (!user)
        throw new Error('User not found')

    const following = data.findUser(user => user.username === username)

    if (!following)
        throw new Error('Following user not found')

    const index = user.following.indexOf(username)

    if (index < 0)
        user.following.push(username)
    else
        user.following.splice(index, 1)

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default toggleFollowUser