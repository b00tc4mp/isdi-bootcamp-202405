import { validate, errors } from '../../com/index.js'

const { SystemError } = errors

export default postId => {
    validate.id(postId)

    return fetch(`http://localhost:8080/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
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