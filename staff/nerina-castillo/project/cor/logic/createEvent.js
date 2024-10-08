import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, image, title, description, location, startDate, startTime, tickets) => {
    validate.string(userId, 'userId')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.url(image, 'image')
    validate.location(location, 'location')
    validate.date(startDate, 'startDate')
    validate.string(startTime, 'startTime')
    validate.url(tickets, 'tickets')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.create({
                image,
                title,
                description,
                location,
                startDate,
                startTime,
                tickets,
                author: userId

            })
                .catch(error => { throw new SystemError(error.message) })
        })
}

