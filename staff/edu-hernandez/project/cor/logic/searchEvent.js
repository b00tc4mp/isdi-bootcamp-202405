import { User, Event } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, query) => {
    validate.string(userId, 'userId')
    validate.string(query, 'query')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.find({
                $or: [
                    { title: new RegExp(query, 'i') },
                    { caption: new RegExp(query, 'i') }
                ]
            }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(events => {
                    const promises = events.map(event => {
                        event.fav = user.fav.some(eventObjectId => eventObjectId.toString() === event._id.toString())
                        event.going = event.going.some(userObjectId => userObjectId.toString() === userId)

                        return User.findById(event.author).lean()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(author => {
                                if (!author) throw new NotFoundError('author not found')

                                event.author = {
                                    id: author._id.toString(),
                                    username: author.username,
                                    avatar: author.avatar,
                                    following: user.following.some(userObjectId => userObjectId.toString() === author._id.toString())
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