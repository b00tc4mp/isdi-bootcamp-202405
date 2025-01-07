import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default (petsitterId) => {
    validate.id(petsitterId, 'petsitterId')

    return fetch(`${import.meta.env.VITE_API_URL}/petsitters/${petsitterId}`)
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200) {
                return response.json()
                    .then(petsitter => petsitter)
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}