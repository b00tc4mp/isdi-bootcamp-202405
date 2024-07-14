const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/

function validateString(value, explain = 'value') {
    if (typeof value !== 'string') throw new TypeError(`${explain} is not a string`)
    if (value.trim().length === 0) throw new Error(`invalid ${explain}`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

function validateObject(object, explain = 'object') {
    if (typeof object !== 'object') throw new TypeError(`${explain} is not an object`)
}

function validateUsername(username, explain = 'username') {
    validateString(username, explain)
    if (!USERNAME_REGEX.test(username)) throw new SyntaxError(`invalid ${explain}`)
    if (!username.trim().length) throw new SyntaxError(`invalid ${explain}`)
}

function validatePassword(password, explain = 'password') {
    validateString(password, explain)
    if (password.trim().length < 8) throw new SyntaxError(`${explain} is shorter tan 8 characters`)
    if (password.includes(' ')) throw new SyntaxError(`${explain} has spaces`)
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name.trim())) throw new SyntaxError(`invalid ${explain}`)
}

function validateEmail(email, explain = 'email') {
    validateString(email, explain)
    if (!EMAIL_REGEX.test(email.trim())) throw new SyntaxError(`invalid ${explain}`)
}

function validateImage(image, explain = 'image') {
    validateString(image, 'image')
    if (!image.startsWith('http')) throw new SyntaxError(`Invalid ${explain}`)
}

function validatePostId(postId, explain = 'postId') {
    validateString(postId, explain)
    if (postId.trim().length === 0) throw new SyntaxError(`Invalid ${explain}`)
}

const validate = {
    string: validateString,
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    name: validateName,
    email: validateEmail,
    image: validateImage,
    postId: validatePostId

}

export default validate
