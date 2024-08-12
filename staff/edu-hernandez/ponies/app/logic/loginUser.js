import { validate, errors } from 'com'

const { SystemError } = errors

export default (username, password) => {
    validate.username(username)
    validate.password(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(token => sessionStorage.token = token)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

// import { validate, errors } from 'com'

// export default (username, password, callback) => {
//     validate.username(username)
//     validate.password(password)
//     validate.callback(callback)

//     const xhr = new XMLHttpRequest

//     xhr.onload = () => {
//         if (xhr.status === 200) {
//             const token = JSON.parse(xhr.response)
//             sessionStorage.token = token

//             callback(null)

//             return
//         }

//         const { error, message } = JSON.parse(xhr.response)

//         const constructor = errors[error]

//         callback(new constructor(message))
//     }

//     xhr.onerror = () => callback(new Error('network error'))

//     xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)
//     xhr.setRequestHeader('Content-Type', 'application/json')

//     xhr.send(JSON.stringify({ username, password }))
// }