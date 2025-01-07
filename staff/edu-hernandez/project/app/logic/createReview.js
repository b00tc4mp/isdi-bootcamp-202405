import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId, eventId, rating, comment) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
    validate.rating(rating, 'rating')
    validate.string(comment, 'comment')

    return fetch(`${import.meta.env.VITE_API_URL}/events/reviews`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, eventId, rating, comment })
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
        .catch(error => {
            throw new SystemError(error.message)
        })
}
