import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (oldPassword, newPassword, newPasswordRepeat) => {
    validate.password(oldPassword)
    validate.password(newPassword)
    validate.password(newPasswordRepeat)

    return fetch('http://localhost:8080/users/password', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword, newPassword, newPasswordRepeat })
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