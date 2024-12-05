import data from '../data/index.js'

import validate from '../validate.js'

const toggleUserFollow = (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')

    const user = data.findUser(user => user.username === username)

    if (user === null) {
        throw new Error('user not found')
    }

    if (user.username === targetUsername) {
        throw new Error('you can\'t follow yourself')
    }

    const targetUser = data.findUser(user => user.username === targetUsername)


    const followingIndex = user.following.findIndex(username => username === targetUsername)

    const followerIndex = targetUser.followers.findIndex(username => username === user.username)


    if ((followingIndex === -1 && followerIndex !== -1) || (followerIndex === -1 && followingIndex !== -1)) {
        throw new Error('something is wrong')
    }


    if (followingIndex !== -1) {
        user.following.splice(followingIndex, 1)
    } else {
        user.following.push(targetUsername)
    }


    if (followerIndex !== -1) {
        targetUser.followers.splice(followerIndex, 1)
    } else {
        targetUser.followers.push(user.username)
    }


    data.updateUser(user => user.username === username, user)
    data.updateUser(user => user.username === targetUsername, targetUser)
}

export default toggleUserFollow