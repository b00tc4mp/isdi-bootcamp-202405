import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (username, id, newCaption, callback) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.findOne({ _id: id }).lean()
                .then(post => {
                    if (!post) {
                        callback(new NotFoundError('post not found'))

                        return
                    }

                    if (post.author.toString() !== user._id.toString()) {
                        callback(new OwnershipError('post is not from user'))

                        return
                    }

                    if (post.caption !== newCaption) {
                        Post.updateOne({ _id: id }, { $set: { caption: newCaption } })
                            .then(() => callback(null))
                            .catch(error => callback(new SystemError(error.message)))
                    } else callback(null)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}