import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (username, id, newCaption) => {
    validate.username(username)
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findOne({ _id: id }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')

                    if (post.author.toString() !== user._id.toString())
                        throw new OwnershipError('post is not from user')

                    if (post.caption !== newCaption) {
                        return Post.updateOne({ _id: id }, { $set: { caption: newCaption } })
                            .catch(error => { throw new SystemError(error.message) })
                    }
                })
        })
        .then(() => { })
}