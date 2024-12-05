import data from '../data/index.js'

import validate from '../validate.js'

const getAllPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(new Error(error.message))

            return
        }

        if (!user) callback(new Error('user not found'))

        data.findPosts(() => true, (error, posts) => {
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
}

export default getAllPosts