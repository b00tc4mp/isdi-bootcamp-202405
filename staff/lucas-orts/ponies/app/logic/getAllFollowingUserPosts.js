import { validate, errors } from 'com'

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

        const constructor = errors[error]

        callabck(new constructor(message))
    }

    xhr.onerror = () => callabck(new Error('network error'))

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/follows`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send()
}