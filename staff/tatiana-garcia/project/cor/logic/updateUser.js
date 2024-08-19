import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { SystemError, NotFoundError, DuplicityError } = errors

export default function updateUser(userId, newImage, newName, newSurname, newEmail, newUsername, newPassword) {
    validate.string(userId, 'userId')
    validate.image(newImage, 'newImage')
    validate.name(newName, 'newName')
    validate.surname(newSurname, 'newSurname')
    validate.email(newEmail, 'newEmail')
    validate.username(newUsername, 'newUsername')
    validate.password(newPassword, 'newPassword')

    return User.findOne({ username: newUsername }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('username already in use')

            return User.findById(userId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findByIdAndUpdate(userId, { image: newImage, name: newName, surname: newSurname, email: newEmail, username: newUsername, password: newPassword })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })

}