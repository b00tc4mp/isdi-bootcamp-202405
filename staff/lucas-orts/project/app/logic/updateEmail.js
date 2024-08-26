import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (email, password) => {
    validate.email(email)
    validate.password(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/email`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
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
