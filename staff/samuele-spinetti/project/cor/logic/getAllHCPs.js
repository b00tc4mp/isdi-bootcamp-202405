import { User, HealthCareProvider } from '../data/models.js'

import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return HealthCareProvider.find({}, { __v: 0 }).sort({ name: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(healthCareProviders => {
                    return healthCareProviders.map(healthCareProvider => {
                        healthCareProvider.id = healthCareProvider._id.toString()
                        healthCareProvider.location.id = healthCareProvider.location._id.toString()
                        delete healthCareProvider._id
                        delete healthCareProvider.location._id

                        return healthCareProvider
                    })
                })
        })
}