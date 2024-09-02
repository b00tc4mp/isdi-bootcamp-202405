import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default commentId => {
    validate.id(commentId, 'commentId')

    return fetch(`http://localhost:8080/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        },
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 204) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}