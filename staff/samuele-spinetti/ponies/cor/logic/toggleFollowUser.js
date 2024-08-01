import { User } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername)

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.findOne({ username: targetUsername }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('TargetUser not found')

                    const { following } = user

                    const index = following.indexOf(targetUsername)

                    if (index < 0)
                        following.push(targetUsername)
                    else
                        following.splice(index, 1)

                    return User.updateOne({ username }, { $set: { following } })
                        .catch(error => { throw new SystemError(error.message) })
                })
                .then(() => { })
        })
}