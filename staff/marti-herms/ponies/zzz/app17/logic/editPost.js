import { validate, errors } from 'com'

export default (id, newCaption, callback) => {
    validate.string(id, 'id')
    validate.string(newCaption, 'newCaption')
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${id}/caption`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send(JSON.stringify({ newCaption }))
}