import { User, Event } from '../data/models.js'
import { errors, validate } from '../../com/index.js'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userId, image, description, location, startDate, endDate) => {
    validate.string(userId, 'userId')
    validate.string(description, 'description')
    validate.location(location, 'location')
    validate.eventDates(new Date(startDate), new Date(endDate))

    if (image) validate.string(image, 'image')
    if (!description) throw new ValidationError('description is required')
    if (!location) throw new ValidationError('location is required')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.create({
                author: userId,
                ...(image !== undefined && { image }),
                description,
                location,
                startDate,
                endDate
            })
                .catch(error => { throw new SystemError(error.message) })
        })
}