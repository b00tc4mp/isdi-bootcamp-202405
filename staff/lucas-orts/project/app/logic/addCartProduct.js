export default (productId) => {
    // Recuperar el carrito de productos desde localStorage (si existe)
    const cart = localStorage.cart !== undefined ? JSON.parse(localStorage.cart) : []

    // Verificar si el producto ya está en el carrito
    if (!cart.includes(productId)) {
        cart.push(productId)

        // Guardar el carrito actualizado en localStorage
        localStorage.cart = JSON.stringify(cart)
    }

    // Devolver un valor indicando que la operación fue exitosa (opcional)
    return true
}

