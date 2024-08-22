import { User, Product } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, productId, minprize, maxprize) => {
    validate.string(userId, 'userId')
    validate.string(productId, 'productId')
    validate.number(minprize, 'minprize')
    validate.number(maxprize, 'maxprize')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.findById(productId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(product => {
                    if (!product) throw new NotFoundError('product not found')

                    return Product.updateOne({ _id: productId }, { $set: { minprize, maxprize } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}