import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, surname, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, username, password, passwordRepeat })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

// import { validate, errors } from 'com'

// export default (name, surname, email, username, password, passwordRepeat, callback) => {
//     validate.name(name)
//     validate.name(surname, 'surname')
//     validate.email(email)
//     validate.username(username)
//     validate.password(password)
//     validate.password(passwordRepeat, 'passwordRepeat')
//     validate.callback(callback)

//     const xhr = new XMLHttpRequest

//     xhr.onload = () => {
//         if (xhr.status === 201) {
//             callback(null)

//             return
//         }

//         const { error, message } = JSON.parse(xhr.response)

//         const constructor = errors[error]

//         callback(new constructor(message))
//     }

//     xhr.onerror = () => callback(new Error('network error'))

//     xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)
//     xhr.setRequestHeader('Content-Type', 'application/json')

//     xhr.send(JSON.stringify({ name, surname, email, username, password, passwordRepeat }))
// }