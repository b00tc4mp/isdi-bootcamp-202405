import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (name, surname, username, email, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.password(passwordRepeat)

    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, username, email, password, passwordRepeat })
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