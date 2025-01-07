import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, CredentialsError, SystemError, ValidationError } = errors

export default (username, password) => {
    try {
        validate.username(username)
        validate.password(password)
    } catch (error) {
        if (error instanceof ValidationError) { throw error }

        throw new SystemError(error.message)
    }

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match)
                        throw new CredentialsError('wrong password')

                    return user._id.toString()
                })
        })
}