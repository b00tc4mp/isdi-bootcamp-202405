import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { ValidationError, DuplicityError, SystemError } = errors

export default (name, surname, email, phone, address, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phone(phone)
    validate.address(address)
    validate.password(password)

    if (password !== passwordRepeat) throw new ValidationError('passwords do not match')

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('email already exists')

            return User.findOne({ phone }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (user) throw new DuplicityError('phone already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>
            User.create({
                name,
                surname,
                email,
                phone,
                address,
                password: hash
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}
