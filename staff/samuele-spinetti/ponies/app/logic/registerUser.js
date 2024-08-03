import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (name, surname, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, username, password, passwordRepeat })
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