import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { ValidationError, DuplicityError, SystemError } = errors

export default (name, surname, email, phoneNumber, username, password, passwordRepeat, role, title, image, description, category, startDate, endDate, budgetGoal) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phoneNumber(phoneNumber)
    validate.username(username)
    validate.password(password)
    validate.string(role)
    validate.string(title)
    validate.url(image, 'image')
    validate.string(description, 'description')
    validate.string(category)
    validate.date(startDate, 'startDate')
    validate.date(endDate, 'endDate')
    validate.string(budgetGoal)

    if (password !== passwordRepeat) throw new ValidationError('Passwords do not match')

    if (startDate > endDate) throw new ValidationError('End date must be after start date')

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
        .then(hash => {
            return User.create({
                name,
                surname,
                email,
                phoneNumber,
                username,
                password: hash,
                role,
                title,
                image,
                description,
                category,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                budgetGoal
            })
        }).then(() => { })
}