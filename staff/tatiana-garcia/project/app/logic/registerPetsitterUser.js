import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default (name, surname, username, cif, city, email, password, passwordRepeat) => {
    validate.name(name, 'name')
    validate.surname(surname)
    validate.username(username)
    validate.cif(cif, 'cif')
    validate.city(city, 'city')
    validate.email(email)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')

    return fetch(`${import.meta.env.VITE_API_URL}/petsitterUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, username, cif, city, email, password, passwordRepeat })
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