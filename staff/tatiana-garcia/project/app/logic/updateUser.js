import { errors, validate } from '../../com/index.js'
import extractPayLoadFromToken from '../util/extractPayLoadFromToken'

const { SystemError } = errors

export default (image, name, surname, email, username, password) => {
    validate.image(image, 'image')
    validate.name(name, 'name')
    validate.surname(surname, 'surname')
    validate.email(email, 'email')
    validate.username(username, 'username')
    validate.password(password, 'password')

    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ userId, image, name, surname, email, username, password })
    })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(response => {
            const { status } = response

            if (status === 204) return

            return response.json()
                .then(body => {
                    const { error, message } = JSON.parse(body)

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}