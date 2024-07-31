import { validate, errors } from 'com'

export default (postId, callabck) => {
    validate.postId(postId)
    validate.callback(callabck)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callabck(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callabck(new constructor(message))
    }

    xhr.onerror = () => callabck(new Error('network error'))

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    xhr.send()
}