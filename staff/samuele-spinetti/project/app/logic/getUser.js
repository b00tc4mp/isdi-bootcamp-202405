import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default targetUserId => {
    validate.id(targetUserId, 'targetUserId')

    return fetch(`http://localhost:8080/users/${targetUserId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(targetUser => targetUser)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}