import { validate, errors } from 'com'

const { SystemError } = errors

export default newEmail => {
    validate.string(newEmail, 'email')

    return fetch(`${import.meta.env.VITE_API_URL}/users/email`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newEmail })
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