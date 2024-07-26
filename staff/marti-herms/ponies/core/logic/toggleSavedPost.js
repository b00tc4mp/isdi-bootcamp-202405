import { ObjectId } from 'mongoose'
import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            Post.findById(postId).lean()
                .then(post => {
                    if (!post) {
                        callback(new Error('post not found'))

                        return
                    }

                    const postIndex = user.favs.findIndex(id => id.toString() === postId)

                    if (postIndex !== -1) {
                        user.favs.splice(postIndex, 1)
                    } else {
                        user.favs.push(post._id)
                    }

                    User.updateOne({ username }, { $set: { favs: user.favs } })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}