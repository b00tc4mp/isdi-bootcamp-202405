import { User, Post } from '../data/models.js'

import { validate } from 'com'

export default (username, postId, callback) => {
    validate.username(username)
    validate.postId(postId)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            Post.findById({ _id: postId }).lean()
                .then(post => {
                    if (!post) {
                        callback(new Error('post not found'))

                        return
                    }

                    if (post.author !== username) {
                        callback(new Error('post does not belong to user'))

                        return
                    }

                    Post.deleteOne({ _id: postId })
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}