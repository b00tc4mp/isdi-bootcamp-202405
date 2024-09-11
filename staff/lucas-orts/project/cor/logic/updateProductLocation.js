import { User, Product } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError, OwnershipError } = errors

export default (userId, productId, location) => {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')
    validate.location(location)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.findById(productId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(product => {
                    if (!product) throw new NotFoundError('product not found')

                    if (product.farmer.toString() !== userId) throw new OwnershipError('product does not belong to user')

                    return Product.updateOne({ _id: productId }, { $set: { location } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}