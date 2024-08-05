import { validate, errors } from 'com'

const { SystemError } = errors

export default query => {
    validate.string(query, 'query')

    return fetch(`${import.meta.env.VITE_API_URL}/search?q=${query}`)
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(colors => colors)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}