import { User } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({ role: 'petsitter' }, { __v: 0 }).sort({ name: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(petsitters => {
                    return petsitters.map(petsitter => ({
                        id: petsitter._id.toString(),
                        image: petsitter.image,
                        name: petsitter.name,
                        city: petsitter.city,
                        description: petsitter.description,
                        email: petsitter.email,
                        phoneNumber: petsitter.phoneNumber,
                        pets: petsitter.pets
                    }))
                })
        })
}
