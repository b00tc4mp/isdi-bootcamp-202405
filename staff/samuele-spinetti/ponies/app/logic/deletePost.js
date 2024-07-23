import validate from '../validate.js'

const deletePost = (postId, callabck) => {
    validate.postId(postId)
    validate.callback(callabck)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callabck(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callabck(new constructor(message))
    }

    xhr.onerror = () => callabck(new Error('Network error'))

    xhr.open('DELETE', `http://localhost:8080/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)

    xhr.send()
}

export default deletePost