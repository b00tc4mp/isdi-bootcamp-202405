import { User, Game } from '../data/models.js'

import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, query) => {
    validate.id(userId, 'userId')
    validate.string(query, 'query')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Game.find({ name: new RegExp(query) }, { __v: 0 }).sort({ date: -1 }).lean()
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
}