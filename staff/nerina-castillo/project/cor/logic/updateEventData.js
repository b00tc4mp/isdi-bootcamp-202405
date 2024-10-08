import { User, Event } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, OwnershipError, SystemError } = errors

export default (userId, eventId, image, title, description, location, startDate, startTime, tickets) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
    validate.string(image, 'image')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.location(location, 'location')
    validate.date(startDate, 'startDate')
    validate.string(startTime, 'startTime')
    validate.url(tickets, 'tickets')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    if (event.author.toString() !== userId) throw new OwnershipError('event does not belong to user')

                    return Event.findByIdAndUpdate(eventId, {
                        image,
                        title,
                        description,
                        location,
                        startDate,
                        startTime,
                        tickets
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}