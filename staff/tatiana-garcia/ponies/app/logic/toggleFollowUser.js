import data from '../data'
import validate from '../validate'

function toggleFollowUser(username) {
    validate.username(username, 'username')

    const user = data.findUser(user => user.username === sessionStorage.username)

    if (!user) {
        throw new Error('user not found')
    }

    const followingUser = data.findUser(user => user.username === username)

    if (!followingUser) throw new Error('following user not found')

    const index = user.following.indexOf(username)

    if (index < 0) {

        user.following.push(username)

    } else {

        user.following.splice(index, 1)
    }

    data.updateUser(user => user.username === sessionStorage.username, user)

}

export default toggleFollowUser