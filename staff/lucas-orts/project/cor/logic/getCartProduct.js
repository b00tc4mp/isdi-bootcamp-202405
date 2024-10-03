import { Product } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (productId) => {
    // Validar el productId
    validate.string(productId, 'productId') // Asegúrate de que esto coincida con tu lógica de validación

    // Buscar el producto por su ID
    return Product.findById(productId, { __v: 0 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(product => {
            if (!product) throw new NotFoundError('product not found')

            // Transformar _id a id
            product.id = product._id.toString()
            delete product._id

            return product // Devuelve solo el producto encontrado
        })
}