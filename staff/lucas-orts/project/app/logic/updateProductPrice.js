import { validate, errors } from 'com'

const { SystemError } = errors

export default (productId, minprice, maxprice) => {
    validate.string(productId, 'productId')
    validate.number(minprice, 'minprice')
    validate.number(maxprice, 'maxprice')

    return fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/price`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ minprice, maxprice })
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