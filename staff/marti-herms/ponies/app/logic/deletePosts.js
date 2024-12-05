import { validate, errors } from 'com'

const { SystemError } = errors

export default (id) => {
    validate.string(id, 'id')

    if (id.trim().length === 0) {
        throw new Error('invalid postId')
    }

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sessionStorage.token}` }
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