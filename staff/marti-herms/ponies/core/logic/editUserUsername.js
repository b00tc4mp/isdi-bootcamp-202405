import data from '../data/index.js'

import validate from '../validate.js'

const editUserUsername = (oldUsername, newUsername, password, callback) => {
    validate.username(oldUsername, 'oldUsername')
    validate.username(newUsername, 'newUsername')
    validate.password(password)
    validate.callback(callback)

    data.findUser(user => user.username === newUsername, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user) {
            callback(new Error('username already exists'))

            return
        }

        data.findUser(user => user.username === oldUsername, (error, user) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (!user) {
                callback(new Error('user not found'))

                return
            }

            if (password !== user.password) {
                callback(new Error('wrong password'))

                return
            }

            if (user.username !== newUsername) {
                data.findPosts(post => post.author.username === user.username, (error, posts) => {
                    if (error) {
                        callback(new Error(error.message))

                        return
                    }

                    posts.forEach(post => post.author.username = newUsername)

                    data.updatePosts(posts, (error) => {
                        if (error) {
                            callback(new Error(error.message))

                            return
                        }

                        data.findPosts(post => user.likedPosts.includes(post.id), (error, posts) => {
                            if (error) {
                                callback(new Error(error.message))

                                return
                            }

                            posts.forEach((post) => {
                                const index = post.likes.indexOf(user.username)
                                post.likes[index] = newUsername
                            })

                            data.updatePosts(posts, (error) => {
                                if (error) {
                                    callback(new Error(error.message))

                                    return
                                }

                                data.findUsers(_user => _user.followers.includes(user.username), (error, users) => {
                                    if (error) {
                                        callback(new Error(error.message))

                                        return
                                    }

                                    users.forEach(_user => {
                                        const index = _user.followers.indexOf(user.username)

                                        _user.followers[index] = newUsername
                                    })

                                    data.updateUsers(users, (error) => {
                                        if (error) {
                                            callback(new Error(error.message))

                                            return
                                        }

                                        data.findUsers(_user => _user.following.includes(user.username), (error, users) => {
                                            if (error) {
                                                callback(new Error(error.message))

                                                return
                                            }

                                            users.forEach(_user => {
                                                const index = _user.following.indexOf(user.username)

                                                _user.following[index] = newUsername
                                            })

                                            data.updateUsers(users, (error) => {
                                                if (error) {
                                                    callback(new Error(error.message))

                                                    return
                                                }

                                                user.username = newUsername

                                                data.updateUser(user => user.username === oldUsername, user, (error) => {
                                                    if (error) {
                                                        callback(new Error(error.message))

                                                        return
                                                    }

                                                    callback(null)
                                                })
                                            })
                                        })

                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    })
}

export default editUserUsername