import { User, Post } from '../data/models.js'

import { ObjectId } from 'mongoose'

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

            Post.findById(postId)
                .then(post => {
                    if (post.author.toString() !== user._id.toString()) {
                        callback(new Error('user is not author'))

                        return
                    }

                    const index = user.posts.findIndex(postId => postId.toString() === postId)

                    if (index > -1) user.posts.splice(index, 1)

                    User.updateOne({ username }, { $set: { posts: user.yourPosts } })
                        .then(() => {
                            Post.deleteOne({ _id: postId })
                                .then(() => callback(null))
                                .catch(error => callback(new Error(error.message)))
                        })
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))

        })
        .catch(error => callback(new Error(error.message)))
}