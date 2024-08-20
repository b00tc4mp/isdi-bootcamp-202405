import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId, text) => {
    validate.string(text, 'text')
    validate.string(postId, 'postId')

    return fetch(`${import.meta.env.VITE_API_URL}/comments/${postId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
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