import errors from './errors.js'

const { ValidationError } = errors

const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

function validateString(value, explain = 'Value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function