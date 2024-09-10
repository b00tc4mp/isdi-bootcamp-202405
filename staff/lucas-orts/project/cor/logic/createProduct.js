import { User, Product } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, name, type, minprice, maxprice, image, location) => {
    validate.string(userId, 'userId')
    validate.string(name, 'name')
    validate.string(type, 'type')
    validate.number(minprice, 'minprice')
    validate.number(maxprice, 'maxprice')
    validate.url(image, 'image')
    validate.location(location, 'location')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.create({
                farmer: userId,
                name,
                type,
                minprice,
                maxprice,
                image,
                location
            })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}