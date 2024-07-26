import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(user => {
                    Post.find({ author: user._id }).sort({ date: -1 }).lean()
                        .then(posts => {
                            if (posts.length) {
                                let count = 0

                                posts.forEach(post => {
                                    post.fav = user.favs.some(postObjectId => postObjectId._id.toString() === post._id.toString())
                                    post.like = post.likes.some(userObjectId => userObjectId._id.toString() === user._id.toString())

                                    post.id = post._id.toString()
                                    delete post._id

                                    post.author = {
                                        username: author.username,
                                        avatar: author.avatar,
                                        following: user.following.includes(author.username)
                                    }

                                    count++

                                    if (count === posts.length) {
                                        callback(null, posts)
                                    }
                                })
                            } else callback(null, [])
                        })
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}