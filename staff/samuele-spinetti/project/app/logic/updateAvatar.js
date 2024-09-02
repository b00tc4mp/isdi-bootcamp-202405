import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default newAvatar => {
    validate.string(newAvatar, 'avatar')

    return fetch('http://localhost:8080/users/avatar', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatar: newAvatar })
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