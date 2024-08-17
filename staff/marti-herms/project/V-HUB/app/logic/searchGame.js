import { validate, errors } from 'com'

const { SystemError } = errors

export default (query) => {
    validate.string(query, 'query')

    if (query)
        return fetch(`${import.meta.env.VITE_API_URL}/games/search?q=${query}`, {
            headers: { Authorization: `Bearer ${sessionStorage.token}` }
        })
            .catch(error => { throw new SystemError(error.message) })
            .then(response => {
                const { status } = response

                if (status === 200) {
                    return response.json()
                        .then(games => games)
                }

                return response.json()
                    .then(body => {
                        const { error, message } = body

                        const constructor = errors[error]

                        throw new constructor(message)
                    })
            })

    return Promise.all([])
}