import { User, Post } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, image, caption) => {
    validate.string(userId, 'userId')
    validate.url(image, 'image')
    validate.string(caption, 'caption')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.create({
                image,
                caption,
                author: userId
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}