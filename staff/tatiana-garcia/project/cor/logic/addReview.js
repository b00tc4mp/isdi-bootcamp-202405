import { User, Review } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { SystemError, NotFoundError } = errors

export default (petsitterId, userId, comment, rate = 0) => {
    validate.id(userId, 'userId')
    validate.id(petsitterId, 'petsitterId')
    validate.string(comment, 'comment')
    validate.number(rate, 'rate')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(author => {
            if (!author) throw new NotFoundError('author not found')

            return User.findById(petsitterId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(petsitter => {
                    if (!petsitter) throw new NotFoundError('petsitter not found')

                    return Review.create({
                        author,
                        petsitter,
                        comment,
                        rate
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })

}