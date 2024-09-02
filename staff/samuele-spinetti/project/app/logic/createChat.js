import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default targetUserId => {
    validate.id(targetUserId, 'targetUserId')

    return fetch(`http://localhost:8080/chat/${targetUserId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) {
                return response.json()
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}