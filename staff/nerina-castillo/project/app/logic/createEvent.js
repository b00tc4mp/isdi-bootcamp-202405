import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (image, description, latitude, longitude, startDate, endDate) => {
    validate.string(description, 'description')
    validate.latitude(latitude, 'latitude')
    validate.longitude(longitude, 'longitude')
    validate.eventDates(new Date(startDate), new Date(endDate))

    return fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, description, location: { type: 'Point', coordinates: [longitude, latitude] }, startDate, endDate })
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