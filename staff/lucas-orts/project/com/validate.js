import errors from './errors.js'

const { ValidationError } = errors

const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const PHONE_REGEX = /^(\+\d{1,3}[- ]?)?\d{9,10}$/
const ADDRESS_REGEX = /^[a-zA-Z0-9\s,.'-]{3,}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
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

function validatePhone(phone) {
    validateString(phone, 'phone')
    if (!PHONE_REGEX.test(phone)) throw new ValidationError(`invalid phone`)
}

function validateAddress(address) {
    validateString(address, 'address')
    if (!ADDRESS_REGEX.test(address)) throw new ValidationError(`invalid address`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) throw new ValidationError(`invalid email`)
}

function validateUrl(url, explain = 'url') {
    validateString(url, explain)
    if (!url.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

function validateNumber(value, explain = 'value') {
    if (typeof value !== 'number') throw new ValidationError(`${explain} is not a number`)
}

const validate = {
    string: validateString,
    password: validatePassword,
    name: validateName,
    address: validateAddress,
    email: validateEmail,
    phone: validatePhone,
    url: validateUrl,
    number: validateNumber
}

export default validate