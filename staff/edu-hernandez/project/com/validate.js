import errors from './errors.js'

const { ValidationError } = errors

const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new ValidationError(`${explain} is not a function`)
}

function validateObject(object, explain = 'object') {
    if (object === null || typeof object !== 'object' || object.constructor !== Object) throw new ValidationError(`${explain} is not an object`)
}

function validateUsername(username, explain = 'username') {
    validateString(username, explain)
    if (!USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain}`)
}

function validatePassword(password, explain = 'value') {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError('password length is lower than 8 characters')
    if (password.includes(' ')) throw new ValidationError('password has empty spaces')
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain}`)
}

const valid_roles = ['user', 'organizer']

function validateRole(role, explain = 'role') {
    validateString(role, explain)
    if (!valid_roles.includes(role))
        throw new ValidationError(`invalid ${explain}`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) throw new ValidationError(`invalid email`)
}

const URL_REGEX = /^(https?:\/\/)?([a-z0-9.-]+)\.[a-z]{2,10}(\/.*)?$/

function validateUrl(url, explain = 'url') {
    validateString(url, explain)
    if (!url.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

function validateNumber(number, explain = 'number') {
    if (isNaN(number)) throw new ValidationError(`${explain} is not a number`)
}

function validateArray(array, explain = 'array') {
    if (!(array instanceof Array) || !Array.isArray(array))
        throw new ValidationError(`${explain} is not an array`)
    if (array.length < 1)
        throw new ValidationError(`${explain} must contain at least 1 element`)
}

const validateDate = (date, explain = 'date') => {
    if (typeof date === 'string') {
        date = new Date(date)
    }
    if (!(date instanceof Date) || isNaN(date.getTime()))
        throw new ValidationError(`invalid ${explain}`)
}

function validateLocation(location, explain = 'location') {
    if (!location || typeof location !== 'object' || Array.isArray(location)) {
        throw new ValidationError(`${explain} must be an object`)
    }

    if (typeof location.type !== 'string' || location.type.trim() === '') {
        throw new ValidationError(`invalid ${explain}: type must be a non-empty string`)
    }

    if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        throw new ValidationError(`invalid ${explain}: coordinates must be an array with two elements`)
    }

    const [latitude, longitude] = location.coordinates

    if (typeof latitude !== 'number' || isNaN(latitude)) {
        throw new ValidationError(`invalid ${explain}: latitude must be a valid number`)
    }
    if (typeof longitude !== 'number' || isNaN(longitude)) {
        throw new ValidationError(`invalid ${explain}: longitude must be a valid number`)
    }

    if (latitude < -90 || latitude > 90) {
        throw new ValidationError(`invalid ${explain}: latitude must be between -90 and 90`)
    }

    if (longitude < -180 || longitude > 180) {
        throw new ValidationError(`invalid ${explain}: longitude must be between -180 and 180`)
    }
}

function validateTime(time, explain = 'time') {
    validateString(time, explain)
    if (!TIME_REGEX.test(time))
        throw new ValidationError(`invalid ${explain}: must be in hh:mm format`)
}

function validateRating(rating, explain = 'rating') {
    if (validateNumber(rating, explain))
        throw new ValidationError(`${explain} is not a number`)
    if (rating < 1 || rating > 5)
        throw new ValidationError(`${explain} must be between 1 and 5`)
}

const validate = {
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    role: validateRole,
    email: validateEmail,
    url: validateUrl,
    number: validateNumber,
    array: validateArray,
    string: validateString,
    date: validateDate,
    location: validateLocation,
    time: validateTime,
    rating: validateRating
}

export default validate