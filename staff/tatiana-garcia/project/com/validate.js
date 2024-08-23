import errors from './errors.js'

const { ValidationError } = errors

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const PHONE_REGEX = /^\+?\d{9,15}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name.trim())) throw new ValidationError(`invalid ${explain}`)
}

function validateSurname(surname, explain = 'surname') {
    validateString(surname, 'surname')
    if (!NAME_REGEX.test(surname)) throw new ValidationError(`invalid ${explain}`)
}
function validateEmail(email, explain = 'email') {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email.trim())) throw new ValidationError(`invalid ${explain}`)
}

function validatePassword(password, explain = 'password') {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError(`${explain} length is lower than 8 characters`)
    if (password.includes(' ')) throw new ValidationError(`${explain} has empty spaces`)
}

function validateCity(city) {
    validateString(city, 'city')
    if (city === '') throw new ValidationError('the field can not be empty')
}

function validateDescription(description, explain = 'description') {
    validateString(description, 'description')
    if (description < 1) throw new ValidationError(`the ${explain} must have more than 1 characters`)
    if (typeof description !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateImage(image, explain = 'image') {
    validateString(image, explain)
    if (!image.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

function validatePets(pets) {
    validateArray(pets, ['pets'])
    if (pets.length < 1) throw new ValidationError('at least one pet must be selected')
}

function validateArray(array, explain = ['']) {
    if (!(array instanceof Array)) throw new ValidationError(`${explain} is not an array`)
}

function validatePhoneNumber(phoneNumber, explain = 'phoneNumber') {
    validateString(phoneNumber, 'phoneNumber')
    if (!PHONE_REGEX.test(phoneNumber)) throw new ValidationError(`invalid ${explain}`)
}

const validate = {
    string: validateString,
    name: validateName,
    surname: validateSurname,
    email: validateEmail,
    password: validatePassword,
    city: validateCity,
    description: validateDescription,
    image: validateImage,
    pets: validatePets,
    array: validateArray,
    phoneNumber: validatePhoneNumber
}

export default validate