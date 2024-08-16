import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(event => {
            if (!event)
                throw new NotFoundError('event not found')

            const { attendees } = event

            const index = attendees.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0)
                attendees.push(userId)
            else
                attendees.splice(index, 1)

            return Event.updateOne({ _id: eventId }, { $set: { attendees } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })

}