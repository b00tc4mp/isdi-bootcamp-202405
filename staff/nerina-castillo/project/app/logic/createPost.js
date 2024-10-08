import { validate, errors } from 'com'

const { SystemError, ValidationError } = errors

export default (image, text) => {
    if (image) validate.url(image, 'image')
    if (text) validate.string(text, 'text')
    if (!image && !text) throw new ValidationError('either image or text must be provided')

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
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