import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default chatId => {
    validate.id(chatId, 'chatId')

    return fetch(`http://localhost:8080/chats/${chatId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(chat => chat)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}