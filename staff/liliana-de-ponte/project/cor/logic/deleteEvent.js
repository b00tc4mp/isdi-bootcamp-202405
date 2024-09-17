import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError, OwnerShipError } = errors

export default (userId, eventId) => {
    validate.id(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.messaje) })
        })
        .then(event => {
            if (!event) throw new NotFoundError('event not found')

            if (event.author.toString() !== userId) throw new OwnerShipError('event not belong to user')

            return Event.deleteOne({ _id: eventId })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}