import validate from '../../cor/validate'

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.surname(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)

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

    xhr.open('POST', 'http://localhost:8080/users')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ name, surname, email, username, password, passwordRepeat }))
}

export default registerUser