import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, username, role, email, password, passwordRepeat) => {
    validate.name(name)
    validate.username(username)
    validate.role(role)
    validate.email(email)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, role, email, password, passwordRepeat })
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