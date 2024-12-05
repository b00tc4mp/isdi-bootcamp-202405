import { errors, validate } from 'com'

const { SystemError } = errors

export default (postId, caption) => {
    validate.postId(postId, 'postId')
    validate.string(caption, 'caption')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/caption`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ caption })
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