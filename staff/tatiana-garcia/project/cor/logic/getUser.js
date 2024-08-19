import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotfoundError, SystemError } = errors

export default (userId) => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) { throw new NotfoundError('user not found') }

            user.id = user._id.toString()

            delete user._id

            delete user.password

            return user

        })
}