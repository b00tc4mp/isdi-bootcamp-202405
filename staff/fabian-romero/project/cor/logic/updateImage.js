import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, newImage) => {
    validate.id(userId, 'userId')
    validate.url(newImage, 'image')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.updateOne({ _id: userId }, { $set: { image: newImage } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}