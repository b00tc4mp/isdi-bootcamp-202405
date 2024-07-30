import { validate, errors } from '../../com/index.js'

export default (newAvatar, callback) => {
    validate.image(newAvatar, 'avatar')
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('Network error'))

    xhr.open('PATCH', 'http://localhost:8080/users/avatar')
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ avatar: newAvatar }))
}