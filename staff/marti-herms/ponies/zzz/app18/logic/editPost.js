import { validate, errors } from 'com'

const { SystemError } = errors

export default (id, newCaption) => {
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${id}/caption`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
        body: JSON.stringify({ newCaption })
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