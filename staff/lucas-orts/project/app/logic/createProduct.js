import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, type, minprice, maxprice, image) => {
    validate.string(name, 'name')
    validate.string(type, 'type')
    validate.number(minprice, 'minprice')
    validate.number(maxprice, 'maxprice')
    validate.url(image, 'image')
    return fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, minprice, maxprice, image })
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