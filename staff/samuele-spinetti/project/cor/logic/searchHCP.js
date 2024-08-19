import { User, HealthCareProvider } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, query, distance, coords) => {
    validate.id(userId, 'userId')
    validate.string(query, 'query')
    validate.number(distance, 'distance')
    validate.array(coords, 'coords')
    validate.number(coords[0], 'longitude')
    validate.number(coords[1], 'latitude')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return HealthCareProvider.find({
                $or: [{ name: new RegExp(query, 'i') }, { tags: { $regex: new RegExp(query, 'i') } }],
                location: {
                    $near: {
                        $geometry: { type: 'Point', coordinates: coords },
                        $maxDistance: 1000 * distance
                    }
                }
            }, { __v: 0 }).sort({ name: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(healthCareProviders => healthCareProviders.map(healthCareProvider => {
                    healthCareProvider.id = healthCareProvider._id.toString()
                    healthCareProvider.location.id = healthCareProvider.location._id.toString()
                    delete healthCareProvider._id
                    delete healthCareProvider.location._id

                    return healthCareProvider
                })
                )
        })
}