import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (eventId, eventData) => {
    validate.string(eventId, 'eventId')
    validate.object(eventData, 'eventData')

    const { image, description, latitude, longitude, startDate, endDate } = eventData

    validate.string(image, 'image')
    validate.string(description, 'description')
    validate.latitude(latitude, 'latitude')
    validate.longitude(longitude, 'longitude')
    validate.eventDates(new Date(startDate), new Date(endDate))

    console.log(eventData)

    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(eventData)
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