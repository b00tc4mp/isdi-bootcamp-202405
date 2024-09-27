import { validate, errors } from 'com'

const { SystemError } = errors

export default eventId => {
    validate.id(eventId, 'eventId')

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}/info`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(event => event)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}