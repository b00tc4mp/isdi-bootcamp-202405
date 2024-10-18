import { validate, errors } from 'com'

const { SystemError } = errors

export default (productId, location) => {
    validate.string(productId, 'productId')
    validate.location(location)

    return fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/location`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location })
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