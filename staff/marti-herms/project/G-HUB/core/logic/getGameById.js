import { User, Game } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, gameId) => {
    validate.id(userId, 'userId')
    validate.id(gameId, 'gameId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.mesage) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Game.findById(gameId).lean()
                .catch(error => { throw new SystemError(error.mesage) })
                .then(game => {
                    if (!game) throw new NotFoundError('game not found')

                    return User.findById(game.author).lean()
                        .catch(error => { throw new SystemError(error.mesage) })
                        .then(author => {
                            if (!author) throw new NotFoundError('author not found')

                            game.author = {
                                id: game.author.toString(),
                                username: author.username
                            }

                            game.id = game._id
                            delete game._id

                            return game
                        })
                })
        })
}