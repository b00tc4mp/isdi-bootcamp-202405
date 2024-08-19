import errors from './errors.js'

const { ValidationError } = errors

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

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

function validateUsername(username, explain = 'username') {
    validateString(username, 'username')
    if (!USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain}`)
    if (!username.trim().length) throw new ValidationError(`${explain} has empty spaces`)
}

function validatePassword(password, explain = 'password') {
    validateString(password, 'password')
    if (password.trim().length < 8) throw new ValidationError(`${explain} length is lower than 8 characters`)
    if (password.includes(' ')) throw new ValidationError(`${explain} has empty spaces`)
}

function validateCif(cif, explain = 'cif') {
    validateString(cif, 'cif')
    if (cif.trim().length < 9) throw new ValidationError(`${explain} length is lower than 9 characters`)
    if (cif.includes(' ')) throw new ValidationError(`${explain} has empty spaces`)
}

// function validateRole(role, explain = 'role') {
//     validateString(role, 'role')
//     if (role !== 'user' && role !== 'petsitter') throw new ValidationError(`invalid ${explain}`)
// }

function validateCity(city) {
    validateString(city, 'city')
    if (city === '') throw new ValidationError('the field can not be empty')
}

function validateDescription(description, explain = 'description') {
    validateString(description, 'description')
    if (description < 1 && description > 200) throw new ValidationError(`the ${explain} must have more than 1 characters and less than 200 characters`)
    if (typeof description !== 'string') throw new ValidationError(`${explain} is not a string`)
}

function validateImage(image, explain = 'image') {
    validateString(image, explain)
    if (!image.startsWith('http')) throw new ValidationError(`invalid ${explain}`)
}

function validatePets(pets) {
    if (pets < 1) throw new ValidationError('At least one pet must be selected')
}


const validate = {
    string: validateString,
    name: validateName,
    surname: validateSurname,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    cif: validateCif,
    // role: validateRole,
    city: validateCity,
    description: validateDescription,
    image: validateImage,
    pets: validatePets

}

export default validate