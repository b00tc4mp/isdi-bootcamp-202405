import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundUser, SystemError } = errors

export default (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundUser('user not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(author => {
                    if (!author) {
                        callback(new NotFoundUser('user not found'))

                        return
                    }

                    Post.find({ author: author._id }).sort({ date: -1 }).lean()
                        .then(posts => {
                            if (posts.length) {
                                let count = 0

                                posts.forEach(post => {
                                    post.fav = author.favs.some(postObjectId => postObjectId._id.toString() === post._id.toString())
                                    post.like = post.likes.some(userObjectId => userObjectId._id.toString() === user._id.toString())

                                    post.id = post._id.toString()
                                    delete post._id

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
                            } else callback(null, [])
                        })
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}