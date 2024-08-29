import { validate, errors } from 'com'

const { SystemError } = errors

export default (chatId, content) => {
    validate.id(chatId, 'chatId')
    validate.string(content, 'content')

    if (content.trim().length === 0) throw new Error('empty content')

    return fetch(`${import.meta.env.VITE_API_URL}/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
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