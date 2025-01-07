import { User, Event } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, eventId, caption) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
    validate.string(caption, 'caption')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    if (event.author.toString() !== userId) throw new OwnershipError('event does not belong to user')

                    return Event.updateOne({ _id: eventId }, { $set: { caption } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}