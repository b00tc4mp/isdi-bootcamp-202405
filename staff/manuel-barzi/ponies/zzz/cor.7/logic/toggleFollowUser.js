import { User } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (username, targetUsername) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')

    return User.findOne({ username }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findOne({ username: targetUsername }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('targetUser not found')

                    const { following } = user

                    const index = following.indexOf(targetUsername)

                    if (index < 0)
                        following.push(targetUsername)
                    else
                        following.splice(index, 1)

                    return User.updateOne({ username }, { $set: { following } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}