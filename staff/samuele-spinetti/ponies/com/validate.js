import errors from './errors.js'

const { ValidationError } = errors

const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

function validateString(value, explain = 'Value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateCallback(callback, explain = 'Callback') {
    if (typeof callback !== 'function') throw new ValidationError(`${explain} is not a function`)
}

function validateObject(object, explain = 'Object') {
    if (object === null || typeof object !== 'object' || object.constructor !== Object) throw new ValidationError(`${explain} is not an object`)
}

function validateUsername(username) {
    validateString(username, 'username')
    if (!USERNAME_REGEX.test(username)) throw new ValidationError('Invalid username')
}

function validatePassword(password) {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError('Password length is lower than 8 character')
    if (password.includes(' ')) throw new ValidationError('Password has empty spaces')
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name)) throw new ValidationError(`Invalid ${explain}`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) throw new ValidationError('Invalid email')
}

function validateImage(image, explain = 'image') {
    validateString(image, 'image')
    if (!image.startsWith('http')) throw new ValidationError(`Invalid ${explain}`)
}

function validatePostId(postId) {
    validateString(postId, 'PostId')
    if (postId.trim().length === 0) throw new ValidationError('Invalid postId')
}

const validate = {
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    email: validateEmail,
    image: validateImage,
    string: validateString,
    postId: validatePostId
}

export default validate