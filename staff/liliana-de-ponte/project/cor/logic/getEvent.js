import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, eventId) => {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(event => {
            if (!event) throw new NotFoundError('event not found')

            event.id = event._id.toString()
            delete event._id

            event.location.id = event.location._id.toString()
            delete event.location._id

            delete event.__v

            return event
        })
}