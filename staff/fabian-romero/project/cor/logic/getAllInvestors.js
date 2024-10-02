import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError, PermissionError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            if (user.role !== 'project')
                throw new PermissionError('User role is not project')

            return User.find({ role: 'investor' }, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => {
                    const investorUsers = users.map(targetUser => {
                        targetUser.liked = user.likes.some(userObjectId => userObjectId.toString() === targetUser._id.toString())
                        targetUser.matched = user.match.some(userObjectId => userObjectId.toString() === userId)

                        targetUser.id = targetUser._id.toString()
                        delete targetUser._id

                        return targetUser
                    })

                    return Promise.all(investorUsers)
                })
        })
}
