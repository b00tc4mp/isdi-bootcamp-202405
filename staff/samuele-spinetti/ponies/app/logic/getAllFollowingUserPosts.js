import { validate } from '../../com/index.js'

export default callabck => {
    validate.callback(callabck)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.response)

            callabck(null, posts)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callabck(new constructor(message))
    }

    xhr.onerror = () => callabck(new Error('Network error'))

    xhr.open('GET', 'http://localhost:8080/posts/ponies')
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}