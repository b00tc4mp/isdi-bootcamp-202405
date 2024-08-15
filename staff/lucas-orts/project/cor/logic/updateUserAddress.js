import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'
const { NotFoundError, SystemError } = errors

export default (userId, address) => {
    validate.string(userId, 'UserId')
    validate.address(address)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')


            return User.updateOne({ _id: userId }, { $set: { address } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}