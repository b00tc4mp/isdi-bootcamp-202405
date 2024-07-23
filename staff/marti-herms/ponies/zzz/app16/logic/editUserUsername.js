import validate from '../../core/validate.js'

const editUserUsername = (newUsername, password, callback) => {
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

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('PATCH', `http://localhost:8080/users/${sessionStorage.username}/username`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send(JSON.stringify({ newUsername, password }))
}

export default editUserUsername