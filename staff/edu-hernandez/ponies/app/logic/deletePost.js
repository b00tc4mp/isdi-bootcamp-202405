import { validate, errors } from 'com'

const { SystemError } = errors

// export default (postId, callback) => {
//     validate.string(postId, 'PostId')
//     validate.callback(callback)

// const xhr = new XMLHttpRequest

// xhr.onload = () => {
//     if (xhr.status === 204) {
//         callback(null)

//         return
//     }

//     const { error, message } = JSON.parse(xhr.response)

//     const constructor = window[error]

//     callback(new constructor(message))
// }

// xhr.onerror = () => callback(new Error('network error'))

// xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)
// xhr.setRequestHeader('Authorization', `Basic ${sessionStorage.token}`)

// xhr.send()

// }

export default postId => {
    validate.string(postId, 'postId')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 204) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}