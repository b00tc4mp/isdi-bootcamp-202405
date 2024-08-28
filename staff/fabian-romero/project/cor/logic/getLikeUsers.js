import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({ _id: { $in: user.likes } }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(usersLikes => {
                    if (!usersLikes || usersLikes.length === 0)
                        return []

                    const likeUsers = usersLikes.map(user => {
                        user.id = user._id.toString()
                        delete user._id

                        return user

                    })
                    return Promise.all(likeUsers)
                })
        })
}