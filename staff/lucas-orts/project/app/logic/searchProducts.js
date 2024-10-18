import { errors, validate } from 'com'

const { SystemError } = errors

export default (queryParams = {}) => {
    // Extraemos los parámetros de búsqueda
    const { name, type, distance, coords } = queryParams

    // Validación de parámetros
    if (distance !== undefined) validate.number(distance, 'distance')
    if (name) validate.string(name, 'name')
    if (type) validate.string(type, 'type')
    validate.coordinates(coords, 'coords')

    // Construimos los parámetros de búsqueda dinámicamente
    const searchParams = new URLSearchParams()

    // if (query) searchParams.append('q', query)
    if (distance !== undefined) searchParams.append('distance', distance)
    if (name) searchParams.append('name', name)
    if (type) searchParams.append('type', type)
    if (coords) searchParams.append('coords', coords)

    // Realizamos la solicitud fetch
    return fetch(`${import.meta.env.VITE_API_URL}/products/search?${searchParams.toString()}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(products => products)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

