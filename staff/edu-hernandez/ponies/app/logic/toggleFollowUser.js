import { validate, errors } from 'com'

const { SystemError } = errors

export default targetUserId => {
    validate.string(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId}/follows`, {
        method: 'PATCH',
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

// import { validate } from "com"

// export default (username, callback) => {
//     validate.username(username)
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

//     xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/${username}/follows`)
//     xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

//     xhr.send()
// }