import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (query, distance, coords) => {
    validate.string(query, 'query')
    validate.number(distance, 'distance')
    validate.array(coords, 'coords')
    validate.number(coords[0], 'latitude')
    validate.number(coords[1], 'longitude')

    return fetch(`${import.meta.env.VITE_API_URL}/events/search?q=${query}&distance=${distance}&coords=${coords}`, {
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