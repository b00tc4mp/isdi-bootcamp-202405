export default () => {
    // Recuperar el carrito de productos desde localStorage (si existe)
    const cart = localStorage.cart !== undefined ? JSON.parse(localStorage.cart) : []

    // Contar el número de productos en el carrito
    const cartLength = cart.length

    // Aquí puedes realizar cualquier acción con el número de productos en el carrito
    return cartLength

}