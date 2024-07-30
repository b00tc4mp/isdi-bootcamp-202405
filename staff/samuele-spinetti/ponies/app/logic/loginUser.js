import { validate, errors } from '../../com/index.js'

export default (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const token = JSON.parse(xhr.response)
            sessionStorage.token = token

            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('Network error'))

    xhr.open('POST', 'http://localhost:8080/users/auth')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ username, password }))
}