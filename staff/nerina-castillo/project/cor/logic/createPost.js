import { User, Post } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userId, image, text) => {
    validate.string(userId, 'userId')

    if (text) validate.string(text, 'text')
    if (image) validate.url(image, 'image')
    if (!image && !text) throw new ValidationError('either image or text must be provided')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const postData = {
                author: userId,
                ...(text !== undefined && { text }),
                ...(image !== undefined && { image })
            }

            return Post.create(postData)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })

}