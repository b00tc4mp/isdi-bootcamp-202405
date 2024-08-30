import { User, Event } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, query, distance, coords, date) => {
    validate.string(userId, 'userId')
    validate.string(query, 'query')
    validate.number(distance, 'distance')
    validate.array(coords, 'coords')
    validate.number(coords[0], 'latitude')
    validate.number(coords[1], 'longitude')

    if (date) validate.string(date, 'date')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.find({
                $or: [{ title: new RegExp(query, 'i') }, { description: new RegExp(query, 'i') }],
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: coords
                        },
                        $maxDistance: 1000 * distance
                    }
                },
                ...(date && {
                    date: {
                        $gte: new Date(date),
                        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
                    }
                })
            }, { __v: 0 }).sort({ title: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => events.map(event => {
                    event.id = event._id.toString()

                    delete event._id

                    return event
                }))
        })
}