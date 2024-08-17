import { User, Game } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, gameId) => {
    validate.string(userId, 'userId')
    validate.string(gameId, 'gameId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Game.findById(gameId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(game => {
                    if (!game) throw new NotFoundError('game not found')

                    if (user.favs.some(gameObjectId => gameObjectId.toString() === gameId))
                        return User.findByIdAndUpdate(userId, { $pull: { favs: game._id } })
                            .catch(error => { throw new SystemError(error.message) })
                    else
                        return User.findByIdAndUpdate(userId, { $push: { favs: game._id } })
                            .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(() => { })
}