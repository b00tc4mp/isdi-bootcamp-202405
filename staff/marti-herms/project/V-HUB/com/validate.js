import errors from './errors.js'

const { ValidationError } = errors

const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

const validateString = (string, explain = 'string') => {
    if (typeof string != 'string') throw new ValidationError(`${explain} is not a string`)
}

const validateObject = (object, explain = 'object') => {
    if (object === null || typeof object !== 'object' || object.constructor !== Object) throw new ValidationError(`${explain} is not an object`)
}

const validateUsername = (username, explain = 'username') => {
    validateString(username, explain)
    if (!USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain}`)
}

const validateEmail = (email) => {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) throw new ValidationError(`invalid email`)
}

const validatePassword = (password) => {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError('password length is lower than 8 characters')
    if (password.includes(' ')) throw new ValidationError('password has empty spaces')
}

const validateBoolean = (boolean, explain = 'value') => {
    if (typeof boolean !== 'boolean') throw new ValidationError(`${explain} is not a boolean`)
}

const validate = {
    string: validateString,
    object: validateObject,
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
    boolean: validateBoolean
}

export default validate