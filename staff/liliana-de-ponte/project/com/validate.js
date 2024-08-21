import errors from './errors.js'

const { ValidationError } = errors

const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

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

function validatePassword(password, explain = 'password') {
    validateString(password, explain)
    if (password.trim().length < 8) throw new ValidationError(`${explain} length is lower than 8 characters`)
    if (password.includes(' ')) throw new ValidationError(`${explain} has empty spaces`)
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain}`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) throw new ValidationError('invalid email')
}

function validateUrl(url, explain = 'url') {
    validateString(url, explain)
    if (!url.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

function validateDate(date, explain = 'date') {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) throw new ValidationError(`invalid ${explain}`);
}

function validateLocation(location, explain = 'location') {
    if (!location || typeof location !== 'object') throw new ValidationError(`${explain} must be an object`)

    const { coordinates } = location

    if (!Array.isArray(coordinates) || coordinates.length !== 2) throw new ValidationError(`invalid ${explain} coordinates`)

    coordinates.forEach((value, index) => {
        if (typeof value !== 'number') {
            throw new ValidationError(`invalid ${explain} coordinate value at index ${index}`)
        }
    })
}

function validateLatitude(latitude, explain = 'latitude') {
    if (latitude < -90 || latitude > 90) throw new ValidationError(`${explain} must be between -90 and 90 degrees`)
}

function validateLongitude(longitude, explain = 'longitude') {
    if (longitude < -180 || longitude > 180) throw new ValidationError(`${explain} must be between -180 and 180 degrees`)
}

function validateNumber(number, explain = 'number') {
    if (typeof number !== 'number') throw new ValidationError(`${explain} is not a number`)
}

function validateArray(array, explain = 'array') {
    if (!(array instanceof Array)) throw new ValidationError(`${explain} is not an array`)
}


const validate = {
    string: validateString,
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    email: validateEmail,
    url: validateUrl,
    latitude: validateLatitude,
    longitude: validateLongitude,
    number: validateNumber,
    array: validateArray,
    date: validateDate,
    location: validateLocation

}

export default validate 