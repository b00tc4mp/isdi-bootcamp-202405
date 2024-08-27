import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default date => {
    validate.date(date, 'date')

    return fetch(`${import.meta.env.VITE_API_URL}/events/by-date/${date.toISOString()}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(events => events)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}