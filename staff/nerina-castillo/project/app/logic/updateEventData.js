import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (eventId, image, title, description, latitude, longitude, startDate, startTime, tickets) => {
    validate.string(eventId, 'eventId')
    validate.string(image, 'image')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.latitude(latitude, 'latitude')
    validate.longitude(longitude, 'longitude')
    validate.date(startDate, 'startDate')
    validate.string(startTime, 'startTime')
    validate.url(tickets, 'tickets')

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ image, title, description, location: { coordinates: [latitude, longitude] }, startDate, startTime, tickets })
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