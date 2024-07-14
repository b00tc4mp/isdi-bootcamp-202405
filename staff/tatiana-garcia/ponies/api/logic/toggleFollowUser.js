import data from '../data/index.js'
import validate from '../validate.js'

function toggleFollowUser(username, targetUsername) {
    validate.username(username, 'username')

    const user = data.findUser(user => user.username === username)

    if (!user) {
        throw new Error('user not found')
    }

    const followingUser = data.findUser(user => user.username === targetUsername)

    if (!followingUser) throw new Error('following user not found')

    const index = user.following.indexOf(targetUsername)

    if (index < 0) {

        user.following.push(targetUsername)

    } else {

        user.following.splice(index, 1)
    }

    data.updateUser(user => user.username === username, user)

}

export default toggleFollowUser