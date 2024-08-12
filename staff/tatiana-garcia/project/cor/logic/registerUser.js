import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { ValidationError, DuplicityError, SystemError } = errors

export default (image, name, surname, email, username, password, passwordRepeat, role, petsitterName, city, description, pets) => {
    validate.url(image, 'image')
    validate.name(name, 'name')
    validate.surname(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.role(role, 'role')

    if (role === 'petsitter') {
        validate.name(petsitterName, 'petsitterName')
        validate.city(city, 'city')
        validate.description(description, 'description')
        validate.pets(pets, 'pets')
    }

    if (password !== passwordRepeat) throw new ValidationError('passwords do not match')

    return User.findOne({ email }).lean()
        .then(user => {
            if (user) throw new DuplicityError('user already exists')

            return User.findOne({ username }).lean()
        })
        .then(user => {
            if (user) throw new DuplicityError('user already exists')

            return bcrypt.hash(password, 8)
        })
        .then(hash => {
            const newUser = {
                image,
                name,
                surname,
                email,
                username,
                password: hash,
                role,
            }

            if (role === 'petsitter') {
                newUser.petsitterName = petsitterName
                newUser.city = city
                newUser.description = description
                newUser.pets = pets
            }

            return User.create(newUser)
        })
        .catch(error => {
            if (error instanceof SystemError || error instanceof ValidationError || error instanceof DuplicityError) {
                throw error
            } else {
                throw new SystemError(error.message)
            }
        })
}