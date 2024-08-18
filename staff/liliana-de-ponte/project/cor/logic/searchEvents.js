import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, query, distance, coords) => {
    validate.string(userId, 'userId')
    validate.string(query, 'query')
    validate.number(distance, 'distance')
    validate.array(coords, 'coords')
    validate.number(coords[0], 'latitude')
    validate.number(coords[1], 'longitude')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.find({
                $or: [{ title: new RegExp(query, 'i') }, { description: { $regex: new RegExp(query, 'i') } }],
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: coords
                        },
                        $maxDistance: 1000 * distance
                    }
                }
            }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {
                    const promises = events.map(event => {
                        event.like = user.likes.some(eventObjectId => eventObjectId.toString() === event._id.toString())

                        return User.findById(event.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                event.author = {
                                    id: author._id.toString(),
                                    username: author.username,

                                }

                                event.id = event._id.toString()
                                delete event._id

                                return event
                            })

                    })
                    return Promise.all(promises)
                        .then(events => events)
                })
        })
}


