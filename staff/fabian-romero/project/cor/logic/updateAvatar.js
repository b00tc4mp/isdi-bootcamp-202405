import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, avatar) => {
    validate.string(userId, 'userId')
    validate.url(avatar, 'avatar')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.updateOne({ _id: userId }, { $set: { image } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}