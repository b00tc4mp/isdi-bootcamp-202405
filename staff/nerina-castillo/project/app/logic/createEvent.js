import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (image, title, description, latitude, longitude, startDate, startTime, tickets) => {
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.url(image, 'image')
    validate.latitude(latitude, 'latitude')
    validate.longitude(longitude, 'longitude')
    validate.date(startDate, 'startDate')
    validate.string(startTime, 'startTime')
    validate.url(tickets, 'tickets')

    return fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, title, description, location: { type: 'Point', coordinates: [longitude, latitude] }, startDate, startTime, tickets })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}