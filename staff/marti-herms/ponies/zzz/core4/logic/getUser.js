import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')


            return User.findOne({ username: targetUsername }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user)
                throw new NotFoundError('target user not found')

            user.id = user._id.toString()

            delete user._id

            delete user.password

            return user
        })
}