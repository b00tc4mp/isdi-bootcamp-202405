import { User, Event } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, eventId) => {
    validate.id(userId, 'userId')
    validate.id(eventId, 'eventId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Event.findById(eventId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(event => {
                    if (!event) throw new NotFoundError('event not found')

                    const { likes } = user

                    const index = likes.findIndex(eventObjectId => eventObjectId.toString() === eventId)

                    if (index < 0)
                        likes.push(eventId)

                    else
                        likes.splice(index, 1)

                    return User.updateOne({ _id: userId }, { $set: { likes } })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}

