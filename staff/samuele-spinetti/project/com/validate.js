import errors from './errors.js'

const { ValidationError } = errors

const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateObject(object, explain = 'object') {
    if (object === nul || typeof object !== 'object' || object.constructor !== Object) throw new ValidationError(`${explain} is not a object`)
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain}`)
}

function validateUsername(username) {
    validateString(username, 'username')
    if (!USERNAME_REGEX.test(username)) throw new ValidationError('invalid username')
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) throw new ValidationError('invalid email')
}

function validatePassword(password, explain = 'password') {
    validateString(password, explain)
    if (password.trim().length < 8) throw new ValidationError(`${explain} length is lower than 8 characters`)
    if (password.includes(' ')) throw new ValidationError(`${explain} has empty spaces`)
}

function validateId(id, explain = 'id') {
    validateString(id, explain)
    if (id.trim().length === 0) throw new ValidationError(`invalid ${explain}`)
}

function validateImage(image, explain = 'image') {
    validateString(image, explain)
    if (!image.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

function validateNumber(number, explain = 'number') {
    if (typeof number !== 'number') throw new ValidationError(`${explain} is not a number`)
}

function validateArray(array, explain = 'array') {
    if (!(array instanceof Array)) throw new ValidationError(`${explain} is not an array`)
}

const validate = {
    string: validateString,
    object: validateObject,
    name: validateName,
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
    id: validateId,
    image: validateImage,
    number: validateNumber,
    array: validateArray
}

export default validate