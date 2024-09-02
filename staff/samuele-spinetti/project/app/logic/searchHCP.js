import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (query, distance, coords) => {
    validate.string(query, 'query')
    validate.number(distance, 'distance')
    validate.array(coords, 'coords')
    validate.number(coords[0], 'longitude')
    validate.number(coords[1], 'latitude')

    return fetch(`http://localhost:8080/healthcareproviders/search?q=${query}&distance=${distance}&coords=${coords}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(healthCareProviders => healthCareProviders)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}