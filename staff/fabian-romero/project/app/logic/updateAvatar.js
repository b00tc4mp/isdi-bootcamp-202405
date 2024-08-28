import { validate, errors } from 'com'

const { SystemError } = errors

export default avatar => {
    validate.string(userId, 'userId')
    validate.url(avatar, 'image')

    return fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image })
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