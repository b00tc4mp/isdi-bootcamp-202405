import { validate, errors } from '../../com/index.js'

import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default (callback) => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.response)

            callback(null, user)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('Network error'))

    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    xhr.open('GET', `http://localhost:8080/users/${username}/settings`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}