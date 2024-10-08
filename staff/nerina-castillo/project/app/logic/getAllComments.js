import { errors, validate } from '../../com/index.js'

const { SystemError } = errors

export default postId => {
    validate.string(postId, 'postId')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(posts => posts)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}