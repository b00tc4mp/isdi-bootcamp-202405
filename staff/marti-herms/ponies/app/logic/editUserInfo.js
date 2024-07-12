import data from "../data"

const editUserInfo = (avatar, username, /*newPassword,*/ oldPassword) => {
    const user = data.findUser(user => user.username === sessionStorage.username)

    if (oldPassword !== user.password) {
        throw new Error('wrong password')
    }

    // if (newPassword === oldPassword) {
    //     throw new Error('the passwords must be different')
    // }

    if (user.avatar !== avatar) {
        user.avatar = avatar

        data.updateUser(user => user.username === sessionStorage.username, user)
    }

    if (username && user.username !== username) {
        const posts = data.findPosts(post => post.author === user.username)

        posts.forEach(post => post.author = username)

        data.updatePosts(posts)

        const likedPosts = data.findPosts(post => user.likedPosts.includes(post.id))

        likedPosts.forEach((post) => {
            const index = post.likes.findIndex(username => username === user.username)
            post.likes[index] = username
        })

        data.updatePosts(likedPosts)

        const followedUsers = data.findUsers(_user => _user.followers.includes(user.username))

        followedUsers.forEach(_user => {
            for (let i = 0; i < _user.followers.length; i++) {
                if (_user.followers[i] === user.username) {
                    _user.followers[i] = username
                }
            }
            data.updateUser((user => user.username === _user.username), _user)
        })

        const followingUsers = data.findUsers(_user => _user.following.includes(user.username))

        followingUsers.forEach(_user => {
            for (let i = 0; i < _user.following.length; i++) {
                if (_user.following[i] === user.username) {
                    _user.following[i] = username
                }
            }
            data.updateUser((user => user.username === _user.username), _user)
        })

        user.username = username

        data.updateUser(user => user.username === sessionStorage.username, user)

        sessionStorage.username = username
    }

    // if (password) {
    //     user.password = newPassword
    // }
}

export default editUserInfo