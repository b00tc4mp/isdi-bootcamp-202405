import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).populate('going').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.find({ _id: { $in: user.going } }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {
                    const promises = events.map(event => {
                        return User.findById(event.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                event.author = {
                                    id: author._id.toString(),
                                    username: author.username
                                }

                                event.going = true
                                event.fav = user.fav.some(eventObjectId => eventObjectId.toString() === event._id.toString())

                                event.id = event._id.toString()
                                delete event._id

                                event.location.id = event.location._id.toString()
                                delete event.location._id

                                event.reviews = event.reviews.map(review => {
                                    review.id = review._id.toString()
                                    delete review._id
                                    return review
                                })

                                return event
                            })
                    })

                    return Promise.all(promises)
                        .then(events => events)
                })
        })
}