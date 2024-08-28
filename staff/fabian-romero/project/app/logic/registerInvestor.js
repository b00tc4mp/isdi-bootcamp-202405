
import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, surname, email, phoneNumber, username, password, passwordRepeat, image, description) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phoneNumber(phoneNumber, 'phoneNumber')
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.url(image, 'image')
    validate.string(description, 'description')


    return fetch(`${import.meta.env.VITE_API_URL}/users/investor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, phoneNumber, username, password, passwordRepeat, image, description })
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