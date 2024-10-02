import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (chatId, message) => {
    validate.id(chatId, 'chatId')
    validate.string(message, 'message')

    return fetch(`${import.meta.env.VITE_API_URL}/chats/${chatId}/message`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
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