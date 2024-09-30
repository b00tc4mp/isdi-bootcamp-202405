import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, newDescription) => {
    validate.id(userId, 'userId')
    validate.string(newDescription, 'description')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.updateOne({ _id: userId }, { $set: { description: newDescription } })
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(() => { })
}