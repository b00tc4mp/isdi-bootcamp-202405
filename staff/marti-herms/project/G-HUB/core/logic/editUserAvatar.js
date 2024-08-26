import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, newAvatar) => {
    validate.string(userId, 'userId')
    validate.string(newAvatar, 'avatar')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')


            return User.findByIdAndUpdate(userId, { avatar: newAvatar })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}