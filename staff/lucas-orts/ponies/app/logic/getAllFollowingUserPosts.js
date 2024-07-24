import validate from "../../cor/validate.js"

const getAllFollowingUserPosts = callabck => {
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

    xhr.onerror = () => callabck(new Error('network error'))

    xhr.open('GET', 'http://localhost:8080/posts/follows')
    xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.username}`)
    xhr.send()
}

export default getAllFollowingUserPosts