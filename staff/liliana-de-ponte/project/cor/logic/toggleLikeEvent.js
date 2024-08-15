import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    const { likes } = event

                    const index = likes.findIndex(userObjectId => userObjectId.toString() === userId)

                    if (index < 0)
                        likes.push(userId)

                    else
                        likes.splice(index, 1)

                    return Event.updateOne({ _id: eventId }, { $set: { likes } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}

