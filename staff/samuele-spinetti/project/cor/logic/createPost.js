import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, caption) => {
    validate.id(userId, 'userId')
    validate.string(caption, 'caption')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({
                caption,
                author: userId
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}