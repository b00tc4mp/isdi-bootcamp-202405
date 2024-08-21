import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default (postId, text) => {
    validate.id(postId, 'postId')
    validate.string(text, 'text')

    return fetch(`http://localhost:8080/comments/${postId}`, {
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