import { User, Event } from '../data/models.js'
import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, date) => {
    validate.string(userId)
    validate.date(date)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const startOfDay = new Date(date)
            startOfDay.setHours(0, 0, 0, 0)

            const endOfDay = new Date(date)
            endOfDay.setHours(23, 59, 59, 999)

            const dateFilter = {
                startDate: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }

            return Event.find(dateFilter, { __v: 0 }).sort({ startDate: 1, startTime: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {
                    const promises = events.map(event => {
                        return User.findById(event.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                event.author = {
                                    id: author._id.toString(),
                                    username: author.username,
                                    avatar: author.avatar,
                                    following: (user.following || []).some(userObjectId => userObjectId.toString() === author._id.toString())
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