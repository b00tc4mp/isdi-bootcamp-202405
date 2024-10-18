import { User, Product } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError, OwnershipError } = errors

export default (userId, productId, image) => {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')
    validate.url(image, 'image')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.findById(productId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(product => {
                    if (!product) throw new NotFoundError('product not found')

                    if (product.farmer.toString() !== userId) throw new OwnershipError('product does not belong to user')

                    return Product.updateOne({ _id: productId }, { $set: { image } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}