import { User, Game, Review } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, gameId, comment, rate = 0) => {
    validate.id(userId, 'userId')
    validate.id(gameId, 'gameId')
    validate.string(comment, 'comment')
    validate.number(rate, 'rate')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(author => {
            if (!author) throw new NotFoundError('author not found')

            return Game.findById(gameId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(game => {
                    if (!game) throw new NotFoundError('game not found')

                    return Review.create({
                        author,
                        game,
                        comment,
                        rate
                    })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}