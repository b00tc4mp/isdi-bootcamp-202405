import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, description) => {
    validate.string(userId, 'userId')
    validate.string(description, 'description')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.updateOne({ _id: userId }, { $set: { description } })
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(() => { })
}