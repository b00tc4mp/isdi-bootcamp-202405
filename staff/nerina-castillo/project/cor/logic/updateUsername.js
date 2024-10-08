import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, newUsername) => {
    validate.string(userId, 'userId')
    validate.string(newUsername, 'username')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.updateOne({ _id: userId }, { $set: { username: newUsername } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}