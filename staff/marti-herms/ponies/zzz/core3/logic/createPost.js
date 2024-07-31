import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, img, caption, callback) => {
    validate.username(username)
    validate.string(img, 'img')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.create({
                img,
                caption,
                author: user._id
            })
                .then(post => {
                    user.posts.push(post._id)

                    User.updateOne({ username }, { $set: { posts: user.posts } })
                        .then(() => callback(null))
                        .catch(error => new SystemError(error.message))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}