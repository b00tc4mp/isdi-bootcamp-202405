import { validate, errors } from 'com'

import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default (newUsername, password, callback) => {
    validate.username(newUsername)
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

    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${username}/username`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send(JSON.stringify({ newUsername, password }))
}