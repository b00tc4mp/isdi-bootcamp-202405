import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetEventId) => {
    validate.string(userId, 'userId')
    validate.string(targetEventId, 'targetEventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(targetEventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    const { going } = user

                    const index = going.findIndex(eventObjectId => eventObjectId.toString() === targetEventId.toString())

                    if (index < 0)
                        going.push(targetEventId)
                    else
                        going.splice(index, 1)

                    return User.updateOne({ _id: userId }, { $set: { going } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}