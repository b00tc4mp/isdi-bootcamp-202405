import { Event, User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError, ValidationError } = errors

export default (userId, eventId, rating, comment) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
    validate.rating(rating, 'rating')
    validate.string(comment, 'comment')

    if (!comment.trim()) throw new ValidationError('comment is empty')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId)
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    event.reviews.push({
                        author: userId,
                        id: eventId,
                        rating,
                        comment
                    })

                    return event.save()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}