import { errors } from 'com'

const { SystemError } = errors

import extractPayloadFromToken from '../util/extractPayloadFromToken'

export default () => {
    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${username}/name`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(name => name)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

// import { validate, errors } from 'com'

// import extractPayloadFromToken from '../util/extractPayloadFromToken'

// export default callback => {
//     validate.callback(callback)

//     const xhr = new XMLHttpRequest

//     xhr.onload = () => {
//         if (xhr.status === 200) {
//             const name = JSON.parse(xhr.response)

//             callback(null, name)

//             return
//         }

//         const { error, message } = JSON.parse(xhr.response)

//         const constructor = errors[error]

//         callback(new constructor(message))
//     }

//     xhr.onerror = () => callback(new Error('network error'))

//     const { sub: username } = extractPayloadFromToken(sessionStorage.token)

//     xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${username}/name`)
//     xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
//     xhr.send()
// }