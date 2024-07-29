import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (username, postId, callback) => {
    validate.username(username)
    validate.string(postId, 'postId')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.findById(postId)
                .then(post => {
                    if (post.author.toString() !== user._id.toString()) {
                        callback(new OwnershipError('user is not author'))

                        return
                    }

                    const index = user.posts.findIndex(postId => postId.toString() === postId)

                    if (index > -1) user.posts.splice(index, 1)

                    User.updateOne({ username }, { $set: { posts: user.yourPosts } })
                        .then(() => {
                            Post.deleteOne({ _id: postId })
                                .then(() => callback(null))
                                .catch(error => callback(new SystemError(error.message)))
                        })
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}