import validate from '../validate.js'

export default (oldPassword, newPassword, callback) => {
    validate.password(oldPassword)
    validate.password(newPassword)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('Network error'))

    xhr.open('PATCH', 'http://localhost:8080/users/password')
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ oldPassword, newPassword }))
}