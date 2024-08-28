import { validate, errors } from 'com'

const { SystemError } = errors

export default (gameId) => {
    validate.id(gameId)

    return fetch(`${import.meta.env.VITE_API_URL}/games/${gameId}/reviews`, {
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(reviews => reviews)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}