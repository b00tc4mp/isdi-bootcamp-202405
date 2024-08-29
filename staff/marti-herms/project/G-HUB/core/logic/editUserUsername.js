import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { DuplicityError, NotFoundError, SystemError } = errors

export default (userId, newUsername) => {
    validate.id(userId, 'userId')
    validate.username(newUsername, 'newUsername')

    return User.findOne({ username: newUsername }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('username already in use')

            return User.findById(userId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findByIdAndUpdate(userId, { username: newUsername })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
