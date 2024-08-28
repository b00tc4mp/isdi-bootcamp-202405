import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, CredentialsError, SystemError } = errors

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match)
                        throw new CredentialsError('Wrong password')

                    user.id = user._id.toString()
                    delete user._id

                    return {
                        id: user.id,
                        role: user.role
                    }
                })
        })
}
