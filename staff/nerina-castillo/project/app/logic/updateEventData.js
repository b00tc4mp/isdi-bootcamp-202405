import { validate, errors } from '../../com'

const { SystemError } = errors

export default (eventId, eventData) => {
    validate.string(eventId, 'eventId')
    validate.object(eventData, 'eventData')

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ ...eventData })
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