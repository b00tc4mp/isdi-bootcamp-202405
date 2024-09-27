import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError, OwnerShipError } = errors

export default (userId, eventId, title, organizer, date, duration, description, image, location, address, city) => {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')
    validate.string(title, 'title')
    validate.date(date, 'date')
    validate.string(organizer, 'organizer')
    validate.string(duration, 'duration')
    validate.string(description, 'description')
    validate.string(city, 'city')
    validate.string(address, 'address')
    validate.url(image, 'image')
    validate.location(location, 'location')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    if (event.author.toString() !== userId) throw new OwnerShipError('event does not belong to user')

                    return Event.findByIdAndUpdate(eventId, {
                        title,
                        date,
                        organizer,
                        duration,
                        description,
                        city,
                        address,
                        image,
                        location,
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}