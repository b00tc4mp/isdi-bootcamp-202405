import { validate, errors } from 'com'

const { SystemError } = errors

export default eventId => {
    validate.string(eventId, 'postId')

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/favs`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
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