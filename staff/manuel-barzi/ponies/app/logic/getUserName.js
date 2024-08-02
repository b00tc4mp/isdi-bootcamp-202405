import { errors } from 'com'

const { SystemError } = errors

import extractPayloadFromToken from '../util/extractPayloadFromToken'

export default () => {
    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${username}/name`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(name => name)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}