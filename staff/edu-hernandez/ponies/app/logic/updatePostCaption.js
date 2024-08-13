import { validate, errors } from 'com'

const { SystemError } = errors

export default (postId, caption) => {
    validate.string(postId, 'postId')
    validate.string(caption, 'caption')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/caption`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ caption })
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

// import { validate, errors } from 'com'

// export default (postId, caption, callback) => {
//     validate.string(postId, 'postId')
//     validate.string(caption, 'caption')
//     validate.callback(callback)

//     const xhr = new XMLHttpRequest

//     xhr.onload = () => {
//         if (xhr.status === 204) {
//             callback(null)

//             return
//         }

//         const { error, message } = JSON.parse(xhr.response)

//         const constructor = errors[error]

//         callback(new constructor(message))
//     }

//     xhr.onerror = () => callback(new Error('network error'))

//     xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/caption`)
//     xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
//     xhr.setRequestHeader('Content-Type', 'application/json')

//     xhr.send(JSON.stringify({ caption }))
// }