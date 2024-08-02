import { validate, errors } from 'com'

const { SystemError } = errors

import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default (newUsername, password) => {
    validate.username(newUsername)
    validate.password(password)

    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/username`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ newUsername, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 204) return

            return response.json()
                .then(body => {
                    const { error, message } = JSON.parse(body)

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}