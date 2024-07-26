import { validate } from 'com'

export default (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.string(name)
    validate.string(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(password, 'passwordRepeat')
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ name, surname, email, username, password, passwordRepeat }))
}