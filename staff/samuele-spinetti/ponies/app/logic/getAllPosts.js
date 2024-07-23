import validate from '../validate.js'

const getAllPosts = callback => {
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.response)

            callback(null, posts)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = window[error]

        callback(new constructor(message))
    }

    xhr.onerror = () => callback(new Error('Network error'))

    xhr.open('GET', 'http://localhost:8080/posts')
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}

export default getAllPosts
