import { validate, errors } from 'com'

const { SystemError } = errors

export default newImage => {
    validate.url(newImage, 'image')

    return fetch(`${import.meta.env.VITE_API_URL}/users/image`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: newImage })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 204) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = error[error]

                    throw new constructor(message)
                })
        })
}