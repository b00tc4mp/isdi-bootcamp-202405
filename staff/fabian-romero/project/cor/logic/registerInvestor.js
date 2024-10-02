import bcrypt from 'bcryptjs'
import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { ValidationError, DuplicityError, SystemError } = errors

export default (name, surname, email, phoneNumber, username, password, passwordRepeat, image, description) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phoneNumber(phoneNumber)
    validate.username(username)
    validate.password(password)
    validate.url(image, 'image')
    validate.string(description, 'description')

    if (password !== passwordRepeat) throw new ValidationError('Passwords do not match')

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('User already exists')

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (user) throw new DuplicityError('User already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>
            User.create({
                name,
                surname,
                email,
                phoneNumber,
                username,
                password: hash,
                image,
                description
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}