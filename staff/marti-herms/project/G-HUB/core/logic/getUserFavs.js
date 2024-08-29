import { User, Game } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user) throw new NotFoundError('targetUser not found')

                    return Game.find({ _id: { $in: user.favs } }, { __v: 0 }).sort({ date: -1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(games => {
                            const promises = games.map(game => {
                                game.inLibrary = user.library.some(gameObjectId => gameObjectId.toString() === game._id.toString())
                                game.inFavs = user.favs.some(gameObjectId => gameObjectId.toString() === game._id.toString())

                                game.id = game._id.toString()
                                delete game._id

                                return game
                            })

                            return Promise.all(promises)
                        })
                })
        })
} 