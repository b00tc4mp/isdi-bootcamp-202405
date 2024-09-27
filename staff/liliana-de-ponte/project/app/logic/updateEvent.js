import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (eventId, title, organizer, date, duration, description, image, longitude, latitude, address, city) => {
    validate.id(eventId, 'eventId')
    validate.string(title, 'title')
    validate.date(date, 'date')
    validate.string(organizer, 'organizer')
    validate.string(duration, 'duration')
    validate.string(description, 'description')
    validate.string(city, 'city')
    validate.string(address, 'address')
    validate.url(image, 'image')
    // validate.location(location, 'location')


    return fetch(`${import.meta.env.VITE_API_URL}/events/${eventId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, organizer, date, duration, description, image, location: { coordinates: [latitude, longitude] }, address, city })
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