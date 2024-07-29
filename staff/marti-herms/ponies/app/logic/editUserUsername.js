import { validate, errors } from 'com'

export default (newUsername, password, callback) => {
    validate.username(newUsername)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            sessionStorage.username = newUsername

            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${sessionStorage.username}/username`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send(JSON.stringify({ newUsername, password }))
}