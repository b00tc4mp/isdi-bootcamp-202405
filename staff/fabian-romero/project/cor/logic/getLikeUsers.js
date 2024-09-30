import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({ _id: { $in: user.likes } }, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(usersLikes => {
                    if (!usersLikes || usersLikes.length === 0)
                        return []

                    const likeUsers = usersLikes.map(targetUser => {
                        targetUser.liked = user.likes.some(userObjectId => userObjectId.toString() === targetUser._id.toString())

                        targetUser.id = targetUser._id.toString()
                        delete targetUser._id

                        return targetUser

                    })
                    return Promise.all(likeUsers)
                })
        })
}