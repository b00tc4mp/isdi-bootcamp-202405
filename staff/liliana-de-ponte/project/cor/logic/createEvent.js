import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, title, organizer, date, duration, description, image, location) => {
    validate.string(userId, 'userId')
    validate.string(title, 'title')
    //validate date
    validate.string(organizer, 'organizer')
    validate.string(duration, 'duration')
    validate.string(description, 'description')
    validate.url(image, 'image')
    validate.location(location, 'location')


    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            // else if (latitude < -90 || latitude > 90) {
            //     throw new RangeError(`latitude must be between -90 and 90 degrees`)
            // }

            // else if (longitude < -180 || longitude > 180) {
            //     throw new RangeError(`longitude must be between -180 and 180 degrees`)
            // }

            return Event.create({
                title,
                organizer,
                date,
                duration,
                description,
                image,
                location,
                author: userId

            })
                .catch(error => { throw new SystemError(error.message) })
        })
}

