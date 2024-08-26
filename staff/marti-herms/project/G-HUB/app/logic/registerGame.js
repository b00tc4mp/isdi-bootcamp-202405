import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, image, description, link) => {
    validate.string(name, 'name')
    validate.string(image, 'image')
    validate.string(description, 'description')
    validate.string(link, 'link')

    return fetch(`${import.meta.env.VITE_API_URL}/games`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, image, description, link })
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