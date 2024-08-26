import { Product } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError } = errors

export default userId => {
    // Validar el userId
    validate.string(userId, 'userId')

    // Buscar productos asociados al farmer (usuario) específico y ordenarlos por el campo name en orden alfabético
    return Product.find({ farmer: userId }, { __v: 0 }).sort({ name: 1 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(products => {
            // Transformar _id a id en cada producto
            return products.map(product => {
                product.id = product._id.toString()
                delete product._id
                return product
            })
        })
}