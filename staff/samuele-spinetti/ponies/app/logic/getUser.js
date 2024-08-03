import { errors } from '../../com/index.js'

const { SystemError } = errors

import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default () => {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return fetch(`http://localhost:8080/users/${userId}/settings`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(user => user)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}