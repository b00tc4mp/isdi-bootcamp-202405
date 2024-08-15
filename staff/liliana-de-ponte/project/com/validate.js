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

function validatePassword(password) {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError('password length is lower than 8 characters')
    if (password.includes(' ')) throw new ValidationError('password has empty spaces')
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

// function validateLocation(location, explain = 'location') {

//     // const location = locationString.split(',').map(coord => parseFloat(coord.trim()))

//     if (!Array.isArray(location) || location.length !== 2) throw new ValidationError(`invalid ${explain}`)

//     if (!location.every(location => typeof location === 'number')) throw new ValidationError(`${explain} is not a number`);
// }


function validateLatitude(latitude, explain = 'latitude') {
    // if (typeof latitude !== 'number') throw new ValidationError(`${explain} must be a number`)

    if (latitude < -90 || latitude > 90) throw new ValidationError(`${explain} must be between -90 and 90 degrees`)
}


function validateLongitude(longitude, explain = 'longitude') {
    // if (typeof longitude !== 'number') throw new ValidationError(`${explain} must be a number`)

    if (longitude < -180 || longitude > 180) throw new ValidationError(`${explain} must be between -180 and 180 degrees`)
}


// function validateLocation(location, explain = 'location') {
//     if (!Array.isArray(location) || location.length !== 2) throw new ValidationError(`invalid ${explain}`)

//     const [latitude, longitude] = location;

//     if (latitude < -90 || latitude > 90) throw new ValidationError(`${explain} must be between -90 and 90 degrees`)

//     if (longitude < -180 || latitude > 180) throw new ValidationError(`${explain} must be between -180 and 180 degrees`)

// }


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
    longitude: validateLongitude

    // location: validateLocation

}

export default validate 