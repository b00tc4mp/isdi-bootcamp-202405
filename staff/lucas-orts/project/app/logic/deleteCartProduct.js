import { validate } from "com"

export default (productId) => {
    validate.string(productId, 'productId')

    // Recuperar el carrito de productos desde localStorage (si existe)
    const cart = localStorage.cart !== undefined ? JSON.parse(localStorage.cart) : []

    // Encontrar el índice del producto que se va a eliminar
    const productIndex = cart.findIndex(id => id === productId)

    // Si el producto se encuentra en el carrito
    if (productIndex > -1) {
        // Eliminar el producto del array
        cart.splice(productIndex, 1)

        // Guardar el carrito actualizado en localStorage
        localStorage.cart = JSON.stringify(cart)
    }
}
