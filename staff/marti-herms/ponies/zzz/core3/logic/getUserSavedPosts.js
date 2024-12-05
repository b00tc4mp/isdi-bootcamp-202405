import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.find({ _id: { $in: user.favs } }).sort({ date: -1 }).lean()
                .then(posts => {
                    if (posts.length) {
                        let count = 0

                        posts.forEach(post => {
                            post.fav = user.favs.some(postObjectId => postObjectId._id.toString() === post._id.toString())
                            post.like = post.likes.some(userObjectId => userObjectId._id.toString() === user._id.toString())

                            post.id = post._id.toString()
                            delete post._id

                            User.findOne({ _id: post.author }).lean()
                                .then(author => {
                                    post.author = {
                                        username: author.username,
                                        avatar: author.avatar,
                                        following: user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
                                    }

                                    count++

                                    if (count === posts.length) {
                                        callback(null, posts)
                                    }
                                })
                                .catch(error => callback(new SystemError(error.message)))
                        })
                    } else callback(null, [])
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}