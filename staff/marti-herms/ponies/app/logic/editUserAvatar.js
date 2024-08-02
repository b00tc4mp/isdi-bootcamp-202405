import { validate, errors } from 'com'

const { SystemError } = errors

import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default (avatar) => {
    validate.string(avatar, 'avatar')

    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${username}/avatar`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ avatar })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 204) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}