import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default role => {
    validate.string(role, 'role')

    return fetch(`${import.meta.env.VITE_API_URL}/users?role=${role}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(users => users)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}