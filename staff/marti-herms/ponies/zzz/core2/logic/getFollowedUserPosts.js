import data from '../data/index.js'

import validate from '../validate.js'

const getFollowedUserPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (user === null) {
            callback(new Error('user not found'))

            return
        }

        data.findUsers(followedUser => user.following.includes(followedUser.username), (error, users) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            const posts = users.map(user => user.yourPosts).flat(Infinity)

            data.findPosts(post => posts.includes(post.id), (error, posts) => {
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

export default getFollowedUserPosts