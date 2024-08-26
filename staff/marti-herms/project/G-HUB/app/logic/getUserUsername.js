import { validate, errors } from 'com'

const { SystemError } = errors

import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default (targetUserId = '') => {
    validate.string(targetUserId, 'targetUserId')

    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId || userId}/username`, {
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200) {
                return response.json()
                    .then(username => username)
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}