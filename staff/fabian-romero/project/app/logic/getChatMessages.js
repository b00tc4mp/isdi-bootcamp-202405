import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default targetUserId => {
    validate.id(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/chats/${targetUserId}/messages`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(messages => messages)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}