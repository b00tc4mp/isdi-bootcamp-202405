import { User, Event } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, eventId, eventData) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
    validate.object(eventData, 'eventData')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    if (event.author.toString() !== userId) throw new OwnershipError('event does not belong to user')

                    return Event.updateOne({ _id: eventId }, { $set: eventData }, { new: true })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}