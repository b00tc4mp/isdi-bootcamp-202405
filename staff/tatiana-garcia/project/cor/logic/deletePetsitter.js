import { User, Petsitter } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, petsitterId) => {
    validate.string(userId, 'userId')
    validate.string(petsitterId, 'petsitterId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Petsitter.findById(petsitterId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(petsitter => {
            if (!petsitter) throw new NotFoundError('petsitter not found')

            if (petsitter.author.toString() !== userId) throw new OwnershipError('petsitter does not belong user')

            return Petsitter.deleteOne({ _id: petsitterId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}