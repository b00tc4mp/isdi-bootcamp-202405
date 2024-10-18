import { User, Product } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    // Validar el userId
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // Buscar productos asociados al usuario
            return Product.find({ farmer: userId }, { __v: 0 }).sort({ name: 1, type: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(products => {
                    // Convertir _id a id para cada producto
                    products.forEach(product => {
                        product.id = product._id.toString()
                        delete product._id

                        product.location.id = product.location._id.toString()
                        delete product.location._id
                    })

                    return products
                })
        })
}