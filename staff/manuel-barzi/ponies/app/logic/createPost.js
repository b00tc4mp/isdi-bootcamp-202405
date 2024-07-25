export default (image, caption, callback) => {
    // TODO input validation

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('network error'))

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ image, caption }))
}