import { User, Game, Review } from '../data/models.js'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, gameId) => {
    validate.id(userId, 'userId')
    validate.id(gameId, 'gameId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Game.findById(gameId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(game => {
                    if (!game) throw new NotFoundError('game not found')

                    return Review.find({ game: gameId }).sort({ date: -1 }).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(reviews => {
                            const promises = reviews.map(review => {
                                return User.findById(review.author)
                                    .catch(error => { throw new SystemError(error.message) })
                                    .then(author => {
                                        if (!author) throw new NotFoundError('author not found')

                                        review.author = {
                                            id: review.author.toString(),
                                            username: author.username
                                        }

                                        review.id = review._id
                                        delete review._id

                                        return review
                                    })
                            })

                            return Promise.all(promises)
                        })
                })
        })
}