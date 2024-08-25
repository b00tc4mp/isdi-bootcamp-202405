import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (petsitterId) => {
    validate.string(petsitterId, 'petsitterId')

    return User.findById(petsitterId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(petsitter => {
            if (!petsitter) throw new NotFoundError('petsitter not found')

            petsitter.id = petsitter._id.toString()

            delete petsitter._id

            return petsitter
        })
}