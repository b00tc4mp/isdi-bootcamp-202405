import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, description) => {
    validate.string(userId, 'userId')
    validate.string(description, 'description')

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/description`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
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