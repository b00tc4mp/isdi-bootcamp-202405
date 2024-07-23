import validate from "../../cor/validate"

const loginUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            sessionStorage.username = username

            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('POST', 'http://localhost:8080/users/auth')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ username, password }))
}

export default loginUser