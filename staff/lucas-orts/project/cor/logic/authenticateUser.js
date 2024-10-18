import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, CredentialsError, SystemError } = errors

export default (email, password) => {
    validate.email(email)
    validate.password(password)

    return User.findOne({ email }).lean()
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