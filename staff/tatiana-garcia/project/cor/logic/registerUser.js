import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { ValidationError, DuplicityError, SystemError } = errors

export default (image, name, surname, email, password, passwordRepeat) => {
    validate.image(image, 'image')
    validate.name(name, 'name')
    validate.surname(surname, 'surname')
    validate.email(email)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')

    if (password !== passwordRepeat) throw new ValidationError('passwords do not match')

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('email already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>
            User.create({
                image,
                name,
                surname,
                email,
                password: hash,
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}