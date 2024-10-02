import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId) => {
    validate.id(userId, 'UserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            const promises = user.likes.map(userObjectId => {
                return User.findById(userObjectId).lean()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(targetUser => {
                        if (!targetUser) throw new NotFoundError('Target user not found')

                        const match = targetUser.likes.some(userObjectId => userObjectId.toString() === userId)

                        if (match) {
                            targetUser.liked = user.likes.some(userObjectId => userObjectId.toString() === userId)
                            targetUser.matched = user.match.some(userObjectId => userObjectId.toString() === userId)

                            targetUser.id = targetUser._id.toString()
                            delete targetUser._id
                            delete targetUser.__v


                            return targetUser
                        }
                    })
            })

            return Promise.all(promises)
        })
        .then(users => {
            return users.filter(user => user !== undefined)
        })
}
