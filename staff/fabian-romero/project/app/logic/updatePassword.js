import { validate, errors } from 'com'

const { SystemError } = errors

export default (oldPassword, newPassword, newPasswordRepeat) => {
    validate.password(oldPassword)
    validate.password(newPassword)
    validate.password(newPasswordRepeat)

    return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
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

                    const constructor = error[error]

                    throw new constructor(message)
                })
        })
}