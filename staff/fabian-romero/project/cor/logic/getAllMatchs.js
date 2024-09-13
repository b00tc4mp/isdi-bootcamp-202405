import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId) => {
    validate.string(userId, 'UserId')

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