import { validate, errors } from 'com'

const { SystemError } = errors

export default (gameId, comment, rate) => {
    validate.id(gameId, 'gameId')
    validate.string(comment, 'comment')
    validate.number(rate, 'rate')

    return fetch(`${import.meta.env.VITE_API_URL}/games/${gameId}/review`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment, rate })
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