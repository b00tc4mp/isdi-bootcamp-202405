import { User, Product } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default userId => {
    // Validar el userId
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            // Buscar productos asociados al farmer (usuario) específico y ordenarlos por el campo name en orden alfabético
            return Product.find({ farmer: userId }, { __v: 0 }).sort({ name: 1, type: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(products => {
                    // Transformar _id a id en cada producto
                    const promises = products.map(product => {
                        if (product.farmer.toString() !== userId) throw new OwnershipError('product does not belong to user')
                        product.id = product._id.toString()
                        delete product._id
                        return product
                    })
                    return Promise.all(promises)
                        .then(products => products)
                })
        })
}