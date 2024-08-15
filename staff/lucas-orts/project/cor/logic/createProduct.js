import { User, Product } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, name, type, minprize, maxprize, image) => {
    validate.string(userId, 'userId')
    validate.string(name, 'name')
    validate.string(type, 'type')
    validate.number(minprize, 'minprize')
    validate.number(maxprize, 'maxprize')
    validate.url(image, 'image')
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.create({
                farmer: userId,
                name,
                type,
                minprize,
                maxprize,
                image
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}