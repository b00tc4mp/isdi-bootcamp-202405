
import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

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

            Post.findById(postId).lean()
                .then(post => {
                    if (!post) {
                        callback(new NotFoundError('post not found'))

                        return
                    }

                    const { favs } = user

                    const index = favs.findIndex(postObjectId => postObjectId.toString() === postId)

                    if (index < 0)
                        favs.push(postId)
                    else
                        favs.splice(index, 1)

                    User.updateOne({ username }, { $set: { favs } })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
