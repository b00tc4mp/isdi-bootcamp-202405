import { validate, errors } from '../../com/index.js'

export default (image, caption, callback) => {
    validate.image(image)
    validate.string(caption, 'Caption')
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('Network error'))

    xhr.open('POST', 'http://localhost:8080/posts')
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(JSON.stringify({ image, caption }))
}