import { validate } from 'com'

export default (postId, callback) => {
    validate.string(postId, 'postId')
    validate.callback(callback)

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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}
