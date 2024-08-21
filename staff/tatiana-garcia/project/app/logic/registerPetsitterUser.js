import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default (image, name, surname, city, description, email, password, passwordRepeat, pets) => {
    validate.image(image, 'image')
    validate.name(name, 'name')
    validate.surname(surname)
    validate.city(city, 'city')
    validate.description(description, 'description')
    validate.email(email)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.pets(pets, 'pets')

    return fetch(`${import.meta.env.VITE_API_URL}/petsitterUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, name, surname, city, description, email, password, passwordRepeat, pets })
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