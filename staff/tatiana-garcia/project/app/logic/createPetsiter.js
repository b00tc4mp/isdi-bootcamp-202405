import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (image, petsitterName, city, description, pets) => {
    validate.image(image, 'image')
    validate.string(petsitterName, 'petsitterName')
    validate.city(city, 'city')
    validate.description(description, 'description')
    validate.pets(pets, ['pets'])

    return fetch(`${import.meta.env.VITE_API_URL}/petsitter`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, petsitterName, city, description, pets })
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