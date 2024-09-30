import { validate, errors } from 'com'

const { SystemError } = errors

export default targetUserId => {
    validate.id(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/chat/${targetUserId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ targetUserId })
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(response => {
            const { status } = response

            if (status === 201) {
                return response.json()
            }

            return response.json().then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
        })
}