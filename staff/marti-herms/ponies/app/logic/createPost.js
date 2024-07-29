import { validate } from 'com'

export default (img, caption, callback) => {
    validate.string(img, 'img')
    validate.string(caption, 'caption')
    validate.callback(callback)

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

    const data = { img, caption }

    xhr.send(JSON.stringify(data))
}