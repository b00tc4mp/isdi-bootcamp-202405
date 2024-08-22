import errors from './errors.js'

const { ValidationError } = errors

const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const VALID_TYPES = ['apartment', 'room'] // Valores permitidos para el tipo

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
    if (password.includes(' ') || password.includes('\t') || password.includes('\n')) throw new ValidationError('password has empty spaces')
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain}`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) throw new ValidationError(`invalid email`)
}

function validateUrl(url, explain = 'url') {
    validateString(url, explain)
    if (!url.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

// Nueva función de validación para el tipo de propiedad
function validateType(type, explain = 'type') {
    validateString(type, explain)
    if (!VALID_TYPES.includes(type)) throw new ValidationError(`invalid ${explain}, must be 'apartment' or 'room'`)
}

function validateLatitude(latitude) {
    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
        throw new ValidationError('latitude must be a number between -90 and 90');
    }
    return true;
}
  
  function validateLongitude(longitude, explain = 'longitude') {
    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
      throw new ValidationError(`${explain} must be a number between -180 and 180`);
    }
  }

  function validateNumber(value, explain = 'value', options = {}) {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new ValidationError(`${explain} is not a valid number`);
    }
}

// Nueva función de validación para arrays
function validateArray(value, itemValidator = null, explain = 'array') {
    if (!Array.isArray(value)) throw new ValidationError(`${explain} is not an array`);
    
    if (itemValidator) {
        value.forEach((item, index) => {
            if (item === undefined || item === null) {
                throw new ValidationError(`${explain} at index ${index} is ${item === undefined ? 'undefined' : 'null'}`);
            }

            try {
                itemValidator(item, `${explain}[${index}]`);
            } catch (error) {
                throw new ValidationError(`${explain} contains an invalid item at index ${index}: ${error.message}`);
            }
        });
    }
}

const validate = {
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    email: validateEmail,
    url: validateUrl,
    string: validateString,
    type: validateType, // Añadido a las exportaciones
    array: validateArray, // Añadido a las exportaciones
    latitude: validateLatitude,
    longitude: validateLongitude,
    number: validateNumber
}

export default validate
