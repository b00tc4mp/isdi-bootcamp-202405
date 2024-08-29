import { User, Game, Review } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, reviewId) => {
    validate.id(userId, 'userId')
    validate.id(reviewId, 'reviewId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Review.findByIdAndDelete(reviewId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}