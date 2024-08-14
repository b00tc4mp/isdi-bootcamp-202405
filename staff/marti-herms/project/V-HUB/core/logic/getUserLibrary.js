import { User, Game } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId) => {
    validate.string(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Game.find({ _id: { $in: user.library } }, { __v: 0 }).sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(games => {
                    const promises = games.map(game => {
                        game.inLibrary = user.library.some(gameObjectId => gameObjectId.toString() === game._id.toString())
                        game.inFavs = user.favs.some(gameObjectId => gameObjectId.toString() === game._id.toString())

                        return game
                    })

                    return Promise.all(promises)
                })
        })
} 