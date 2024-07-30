import { validate, errors } from '../../com/index.js'

export default (postId, callback) => {
    validate.postId(postId)
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

    xhr.onerror = () => callback(new Error('Network error'))

    xhr.open('PATCH', `http://localhost:8080/posts/${postId}/likes`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    xhr.send()
}