import { User } from '../data/models.js'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default userId => {
    validate.string(userId, 'userId')

    return User.findById(userId).populate('fav').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            if (!Array.isArray(user.fav)) user.fav = []

            const events = user.fav

            const promises = events.map(event => {
                event.fav = true

                return User.findById(event.author).lean()
                    .then(author => {
                        if (!author) throw new NotFoundError('author not found')

                        event.author = {
                            id: author._id.toString(),
                            username: author.username,
                            avatar: author.avatar,
                            following: user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
                        }

                        event.going = user.going.some(eventObjectId => eventObjectId.toString() === event._id.toString())

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
}
