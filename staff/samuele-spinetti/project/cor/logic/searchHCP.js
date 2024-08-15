import { User, HealthCareProvider } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, query) => {
    validate.id(userId, 'userId')
    validate.string(query, 'query')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return HealthCareProvider.find({ $or: [{ name: new RegExp(query) }, { tags: { $regex: new RegExp(query) } }] }, { __v: 0 }).sort({ name: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(hcr => hcr)
        })
}