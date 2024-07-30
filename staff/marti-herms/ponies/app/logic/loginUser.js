import { validate, errors } from 'com'

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

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send(`{"username":"${username}","password":"${password}"}`)
}