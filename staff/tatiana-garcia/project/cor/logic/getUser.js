import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) { throw new NotFoundError('usuario no encontrado') }

            user.id = user._id.toString()

            delete user._id
            delete user.__v

            delete user.password

            return user

        })
}