import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, newDescription) => {
    validate.string(userId, 'userId')
    validate.string(newDescription, 'newDescription')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            user.description = user.description || ''
            user.description = newDescription

            return user.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}