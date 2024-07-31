import { validate, errors } from 'com'
import extractPayloadFromToken from "../util/extractPayloadFromToken"

export default callback => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const name = JSON.parse(xhr.response)

            callback(null, name)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${username}/name`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}