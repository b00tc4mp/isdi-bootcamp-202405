import { User, Product } from '../data/models.js'
import { validate, errors } from 'com'
const { NotFoundError, SystemError, OwnershipError } = errors

export default (userId, productId) => {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.findById(productId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(product => {
                    if (!product) throw new NotFoundError('product not found')

                    if (product.farmer.toString() !== userId) throw new OwnershipError('product does not belong to user')

                    // Invertir el valor de 'enabled'
                    const newEnabled = !product.enabled

                    return Product.updateOne({ _id: productId }, { $set: { enabled: newEnabled } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}