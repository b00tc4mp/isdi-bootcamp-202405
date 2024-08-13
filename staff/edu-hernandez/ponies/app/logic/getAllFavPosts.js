import { errors } from 'com'

const { SystemError } = errors

export default () => {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/favs`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(posts => posts)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

// import { validate, errors } from 'com'

// export default callback => {
//     validate.callback(callback)

//     const xhr = new XMLHttpRequest

//     xhr.onload = () => {
//         if (xhr.status === 200) {
//             const posts = JSON.parse(xhr.response)

//             callback(null, posts)

//             return
//         }

//         const { error, message } = JSON.parse(xhr.response)

//         const constructor = errors[error]

//         callback(new constructor(message))
//     }

//     xhr.onerror = () => callback(new Error('network error'))

//     xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/favs`)
//     xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
//     xhr.send()
// }
