import bcrypt from 'bcryptjs'
import { validate, errors } from '../../com/index.js'
import { User } from '../data/models.js'

const { ValidationError, DuplicityError, SystemError } = errors

export default (name, username, role, email, password, passwordRepeat) => {
    validate.name(name)
    validate.username(username)
    validate.role(role)
    validate.email(email)
    validate.password(password)

    if (password !== passwordRepeat) throw new ValidationError('password do not match')

    return User.findOne({ email }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('user already exists')

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(user => {
            if (user) throw new DuplicityError('user already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(hash =>
            User.create({
                name,
                username,
                role,
                email,
                password: hash
            })
                .catch(error => { throw new SystemError(error.message) })
        )
        .then(() => { })
}