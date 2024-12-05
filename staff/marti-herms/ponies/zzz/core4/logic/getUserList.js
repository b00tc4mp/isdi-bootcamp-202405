import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username) => {
    validate.username(username)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.find().lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(users => {
            const usernames = users.map(user => user.username)

            return usernames
        })
}