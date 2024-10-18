import { User } from '../data/models.js'
import bcrypt from 'bcryptjs'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, CredentialsError, SystemError, DuplicityError } = errors

export default (userId, email, password) => {
    validate.string(userId, 'userId')
    validate.email(email)
    validate.password(password)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return User.findOne({ email }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(user => {
                            if (user) throw new DuplicityError('email already exists')



                            return User.updateOne({ _id: userId }, { $set: { email } })
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
        .then(() => { })
}