const editPost = (id, newCaption, callback) => {
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

    xhr.open('PATCH', `http://localhost:8080/posts/${id}/caption`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send(JSON.stringify({ newCaption }))
}

export default editPost