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

                    const index = post.likes.findIndex(userObjectId => userObjectId.toString() === user._id.toString())

                    if (index < 0) {
                        post.likes.push(user._id)
                    } else {
                        post.likes.splice(index, 1)
                    }

                    Post.updateOne({ _id: postId }, { $set: { likes: post.likes } })
                        .then(() => {
                            const postIndex = user.likes.findIndex(id => id.toString() === postId)

                            if (postIndex !== -1) {
                                user.likes.splice(postIndex, 1)
                            } else {
                                user.likes.push(post._id)
                            }

                            User.updateOne({ username }, { $set: { likes: user.likes } })
                                .then(() => callback(null))
                                .catch(error => callback(new Error(error.message)))
                        })
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}