import data from '../data/index.js'

import validate from '../validate.js'

const getAllFollowingUserPosts = (username, callback) => {
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

        data.findPosts(post => user.following.includes(post.author), (error, posts) => {
            if (error) {
                callback(new Error(error.message))

                return
            }

            let count = 0

            posts.forEach(post => {
                post.fav = user.favs.includes(post.id)
                post.like = post.likes.includes(username)

                data.findUser(user => user.username === post.author, (error, author) => {
                    if (error) {
                        callback(new Error(error.message))

                        return
                    }

                    post.author = {
                        username: author.username,
                        avatar: author.avatar,
                        following: user.following.includes(author.username)
                    }

                    count++

                    if (count === posts.length)
                        callback(null, posts.reverse())
                })
            })
        })
    })

}

export default getAllFollowingUserPosts