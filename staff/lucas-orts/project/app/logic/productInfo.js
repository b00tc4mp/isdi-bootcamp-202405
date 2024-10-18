import { validate, errors } from 'com'

const { SystemError } = errors

export default productId => {
    validate.string(productId, 'productId')
    return fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .then(product => product)

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}