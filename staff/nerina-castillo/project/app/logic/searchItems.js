import { errors, validate } from 'com'

const { SystemError, ValidationError } = errors

export default (query, type = 'posts') => {
    validate.string(query, 'query')
    validate.string(type, 'type')

    if (type !== 'posts' && type !== 'users') {
        throw new ValidationError('invalid search type')
    }

    return fetch(`${import.meta.env.VITE_API_URL}/${type}/search?=${query}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200) {
                return response.json()
                    .then(results => results)
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
