import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError, PermissionError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            if (user.role !== 'investor')
                throw new PermissionError('User role is not investor')

            return User.find({ role: 'project' }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => {
                    const projectUsers = users.map(user => {
                        user.id = user._id.toString()
                        delete user._id

                        return user
                    })

                    return Promise.all(projectUsers)
                })
        })
}