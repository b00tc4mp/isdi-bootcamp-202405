import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, newAvatar) => {
    validate.username(username)
    validate.string(newAvatar, 'avatar')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')


            return User.updateOne({ username }, { $set: { avatar: newAvatar } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}