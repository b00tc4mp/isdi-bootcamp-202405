import { User, Event } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.find({ _id: { $ne: userId } }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            if (!users) throw new NotFoundError('users not found')

            const events = []

            users.forEach(user => {
                if (user.fav && user.fav.length > 0) {
                    events.push(...user.fav)
                }
            })

            return Event.find({ _id: { $in: events }, author: { $ne: userId } }, { __v: 0 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {
                    if (!events || events.length === 0) return []

                    const promises = events.map(event => {
                        event.fav = true

                        return User.findById(event.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                event.author = {
                                    id: author._id.toString(),
                                    username: author.username,
                                    avatar: author.avatar
                                }

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