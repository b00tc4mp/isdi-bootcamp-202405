import data from '../data/index.mjs'

function toggleFollowUser(username) {

    if (username.trim().length === 0) throw new Error('invalid username')

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (user === null) {
        throw new Error('user not found')
    }

    const followingUser = data.findUser(user => user.following === username)

    if (followingUser === null) throw new Error('following user not found')

    const index = user.following.indexOf(username)

    if (index != -1) {


        user.following.splice(index, 1)

    } else {

        user.following.push(username)
    }

    data.updateUser(user => user.username === sessionStorage.username, user)

}

export default toggleFollowUser