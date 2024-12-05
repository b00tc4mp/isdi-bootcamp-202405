import bcrypt from 'bcryptjs'

import { User, Post } from '../data/models.js'

import { validate, errors } from 'com'

const { DuplicityError, NotFoundError, CredentialsError, SystemError } = errors

export default (oldUsername, newUsername, password, callback) => {
    validate.username(oldUsername, 'oldUsername')
    validate.username(newUsername, 'newUsername')
    validate.password(password)
    validate.callback(callback)

    User.findOne({ username: newUsername }).lean()
        .then(user => {
            if (user) {
                callback(new DuplicityError('username already in use'))

                return
            }

            User.findOne({ username: oldUsername }).lean()
                .then(user => {
                    if (!user) {
                        callback(new NotFoundError('user not found'))

                        return
                    }

                    bcrypt.compare(password, user.password)
                        .then(match => {
                            if (!match) {
                                callback(new CredentialsError('wrong password'))

                                return
                            }

                            User.updateOne({ username: oldUsername }, { $set: { username: newUsername } })
                                .then(() => callback(null))
                                .catch(error => callback(new SystemError(error.message)))
                        })
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
