import data from '../data/index.js'

import validate from '../validate.js'

const getUserPosts = (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, targetUser) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            if (!targetUser) {
                callback(new Error('target user not found'))

                return
            }

            data.findPosts(post => targetUser.yourPosts.includes(post.id), (error, posts) => {
                if (error) {
                    callback(new Error(error.message))

                    return
                }

                posts.forEach(post => {
                    post.fav = user.savedPosts.includes(post.id)
                    post.like = post.likes.includes(username)

                    post.author.following = user.following.includes(post.author.username)
                })

                callback(null, posts.reverse())
            })
        })
    })
}

export default getUserPosts