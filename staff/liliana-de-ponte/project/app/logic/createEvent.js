import { validate, errors } from 'com'

const { SystemError } = errors

export default (title, organizer, date, duration, description, image, location) => {
    validate.string(userId, 'userId')
    validate.string(title, 'title')
    validate.string(organizer, 'organizer')
    validate.string(duration, 'duration')
    validate.string(description, 'description')
    validate.url(image, 'image')
    validate.location(location, 'location')

    return fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, organizer, date, duration, description, image, location })
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