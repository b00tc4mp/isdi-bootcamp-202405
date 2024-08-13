import { validate, errors } from 'com'

const { SystemError } = errors

export default (image, caption) => {
    validate.url(image, 'image')
    validate.string(caption, 'caption')

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, caption })
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

// const { SystemError } = errors

// export default (image, caption) => {
//     validate.url(image, 'image')
//     validate.string(caption, 'caption')

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

    //     xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)
    //     xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    //     xhr.setRequestHeader('Content-Type', 'application/json')

    //     xhr.send(JSON.stringify({ image, caption }))
    // }
