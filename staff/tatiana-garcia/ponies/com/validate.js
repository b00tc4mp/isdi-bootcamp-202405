import errors from "./errors.js"

const { ValidationError } = errors

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
    // if (value.trim().length === 0) throw new ValidationError(`invalid ${explain}`)
} // para caption

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new ValidationError(`${explain} is not a function`)
}

function validateObject(object, explain = 'object') {
    if (object === null || typeof object !== 'object' || object.constructor !== object) throw new ValidationError(`${explain} is not an object`)
}

function validateUsername(username, explain = 'username') {
    validateString(username, 'username')
    if (!USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain}`)
    if (!username.trim().length) throw new ValidationError(`invalid ${explain}`)
}

function validatePassword(password, explain = 'password') {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError(`${explain} length is lower than 8 characters`)
    if (password.includes(' ')) throw new ValidationError(`${explain} has empty spaces`)
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name.trim())) throw new ValidationError(`invalid ${explain}`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email.trim())) throw new ValidationError('invalid email')
}

function validateSurname(surname) {
    validateString(surname, 'surname')
    if (!NAME_REGEX.test(surname)) throw new ValidationError('invalid surname')
}

function validateUrl(url, explain = 'url') {
    validateString(url, explain)
    if (!url.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

function validatePostId(postId) {
    validateString(postId)
    if (postId.trim().length === 0) throw new ValidationError(`invalid ${postId}`)
}

const validate = {
    string: validateString,
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    surname: validateSurname,
    email: validateEmail,
    url: validateUrl,
    postId: validatePostId

}

export default validate
