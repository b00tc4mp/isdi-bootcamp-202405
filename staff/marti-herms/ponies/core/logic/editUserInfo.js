import data from '../data/index.js'

import validate from '../validate.js'

const editUserInfo = (oldUsername, avatar, newUsername, password) => {
    validate.username(oldUsername, 'oldUsername')
    validate.string(avatar, 'avatar')
    validate.username(newUsername, 'newUsername')
    validate.password(password)

    const user = data.findUser(user => user.username === oldUsername)

    if (user === null) {
        throw new Error('user not found')
    }

    if (password !== user.password) {
        throw new Error('wrong password')
    }

    if (user.avatar !== avatar) {
        user.avatar = avatar

        data.updateUser(user => user.username === oldUsername, user)
    }

    if (newUsername && user.username !== newUsername) {
        const posts = data.findPosts(post => post.author === user.username)

        posts.forEach(post => post.author = newUsername)

        data.updatePosts(posts)

        const likedPosts = data.findPosts(post => user.likedPosts.includes(post.id))

        likedPosts.forEach((post) => {
            const index = post.likes.findIndex(username => username === user.username)
            post.likes[index] = newUsername
        })

        data.updatePosts(likedPosts)

        const followedUsers = data.findUsers(_user => _user.followers.includes(user.username))

        followedUsers.forEach(_user => {
            for (let i = 0; i < _user.followers.length; i++) {
                if (_user.followers[i] === user.username) {
                    _user.followers[i] = newUsername
                }
            }
            data.updateUser((user => user.username === _user.username), _user)
        })

        const followingUsers = data.findUsers(_user => _user.following.includes(user.username))

        followingUsers.forEach(_user => {
            for (let i = 0; i < _user.following.length; i++) {
                if (_user.following[i] === user.username) {
                    _user.following[i] = newUsername
                }
            }
            data.updateUser((user => user.username === _user.username), _user)
        })

        user.username = newUsername

        data.updateUser(user => user.username === oldUsername, user)
    }
}

export default editUserInfo