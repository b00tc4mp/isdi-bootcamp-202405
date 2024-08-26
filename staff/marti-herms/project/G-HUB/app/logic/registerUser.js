import { validate, errors } from 'com'

const { SystemError, ValidationError } = errors

export default (username, email, password, rePassword, role) => {
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.string(role, 'role')

    if (password !== rePassword) throw new ValidationError('passwords do not match')

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, role })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}