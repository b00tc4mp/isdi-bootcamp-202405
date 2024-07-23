import validate from '../validate.js'

const toggleLikePost = (postId, callback) => {
    validate.postId(postId)
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

    xhr.onerror = () => callback(new Error('Network error'))

    xhr.open('PATCH', `http://localhost:8080/posts/${postId}/likes`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)

    xhr.send()
}

export default toggleLikePost