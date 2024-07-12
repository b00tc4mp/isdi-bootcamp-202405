import data from '../data/index.js'

function toggleFollowUser(username, targetUsername) {
    if (!username.trim().length) throw new Error('Invalid username')

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('User not found')

    const following = data.findUser(user => user.username === targetUsername)

    if (!following) throw new Error('Following user not found')

    const index = user.following.indexOf(targetUsername)

    if (index < 0)
        user.following.push(targetUsername)
    else
        user.following.splice(index, 1)

    data.updateUser(user => user.username === username, user)
}

export default toggleFollowUser