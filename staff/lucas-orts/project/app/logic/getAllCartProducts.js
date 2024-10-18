import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export default () => {
    // Recuperar los IDs de productos desde localStorage
    const cart = localStorage.cart ? JSON.parse(localStorage.cart) : []

    // Crear un array de promesas para obtener cada producto por su ID
    const products = cart.map(id => {
        return fetch(`${import.meta.env.VITE_API_URL}/products/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`
            }
        })
            .then(response => {
                const { status } = response

                if (status === 200) {
                    return response.json() // Devuelve el producto
                }

                // Manejar errores para cualquier otro estado
                return response.json().then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
            })
    })

    // Ejecutar todas las promesas y devolver los productos
    return Promise.all(products)
        .catch(error => { throw new SystemError(error.message) })
}
