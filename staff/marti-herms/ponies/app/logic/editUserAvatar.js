import validate from '../../core/validate.js'

const editUserAvatar = (avatar, callback) => {
    validate.string(avatar, 'avatar')
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

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('PATCH', `http://localhost:8080/users/${sessionStorage.username}/avatar`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send(JSON.stringify({ avatar, password }))
}

export default editUserAvatar