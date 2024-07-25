import { validate } from 'com'

export default (id, callback) => {
    validate.string(id, 'id')
    validate.callback(callback)

    if (id.trim().length === 0) {
        throw new Error('invalid postId')
    }

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${id}`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}