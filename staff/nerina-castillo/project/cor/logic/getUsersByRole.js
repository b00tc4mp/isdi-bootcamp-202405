import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default role => {
    validate.string(role, 'role')

    return User.find({ role }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            if (users.length === 0) throw new NotFoundError('user not found')

            return users.map(user => {
                user.id = user._id.toString()

                delete user._id

                return user
            })


        })
}