import data from '../data/index.js'

function toggleFollowUser(username) {
    if (!username.trim().length) throw new Error('invalid username')

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('user not found')

    const following = data.findUser(user => user.username === targetUsername)

    if (!following) throw new Error('following user not found')

    const index = user.following.indexOf(targetUsername)

    if (index < 0)
        user.following.push(username)
    else
        user.following.splice(index, 1)

    data.updateUser(user => user.username === username, user)
}

export default toggleFollowUser