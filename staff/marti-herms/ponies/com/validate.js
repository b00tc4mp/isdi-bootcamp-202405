import { errors } from './index.js'

const { ValidationError } = errors

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{3,16}$/
//const PASSWORD_REGEX = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/
const PASSWORD_REGEX = /^\w{8,}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
    if (value.trim().length === 0) throw new ValidationError(`invalid ${explain}`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new ValidationError(`${explain} is not a function`)
}

function validateObject(object, explain = 'object') {
    if (typeof object !== 'object') throw new ValidationError(`${explain} is not an object`)
}

function validateUsername(username, explain = 'username') {
    validateString(username, explain)
    if (!USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain}`)
}

function validatePassword(password) {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError('password is shorter tan 8 characters')
    if (password.includes(' ')) throw new ValidationError('password has empty spaces')
    if (!PASSWORD_REGEX.test(password)) throw new ValidationError('invalid password')
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name.trim())) throw new ValidationError(`invalid ${explain}`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email.trim())) throw new ValidationError('invalid email')
}

const validate = {
    string: validateString,
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    email: validateEmail
}

export default validate