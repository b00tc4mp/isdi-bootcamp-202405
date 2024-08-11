import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default (image, name, surname, email, username, password, passwordRepeat, role, petsitterName, city, description, pets) => {
    validate.url(image, 'image')
    validate.name(name, 'name')
    validate.surname(surname)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.role(role, 'role')

    if (role === 'petsitter') {
        validate.name(petsitterName, 'petsitterName')
        validate.city(city, 'city')
        validate.description(description, 'description')
        validate.pets(pets, 'pets')
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, name, surname, email, username, password, passwordRepeat, role, petsitterName, city, description, pets })
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