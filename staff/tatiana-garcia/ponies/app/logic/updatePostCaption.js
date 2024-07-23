import validate from '../validate'

const updatePostCaption = (postId, caption, callback) => {
    validate.postId(postId, 'postId')
    validate.string(caption, 'caption')
    validate.callback(callback, 'callback')

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

    xhr.open('PATCH', `http://localhost:8080/posts/${postId}/caption`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ caption }))
}

export default updatePostCaption