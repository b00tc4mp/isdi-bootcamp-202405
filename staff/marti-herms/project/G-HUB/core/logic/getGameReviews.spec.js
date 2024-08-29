import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'

import getGameReviews from './getGameReviews.js'
import { User, Game, Review } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

const img = 'https://store-images.s-microsoft.com/image/apps.54354.13510798882606697.7a42c472-75d7-487e-9538-ebb5ce1657e6.372723d8-dd1a-450a-9fed-d420e7705e4e?mode=scale&q=90&h=300&w=200'

const link = 'https://www.microsoft.com/en-us/p/candy-crush-saga/9nblggh18846?activetab=pivot:overviewtab'

describe('getGameReviews', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Game.deleteMany(), Review.deleteMany()]))

    it('succeeds on existing user returning the game\'s reviews', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => {
                return Game.create({ author: user.id, name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
                    .then(game => {
                        return Review.create({ author: user.id, game: game.id, comment: 'great game', rate: 3 })
                            .then(review => getGameReviews(user.id, game.id))
                    })
            })
            .then(reviews => {
                expect(reviews[0].author.username).to.equal('monoloco')
                expect(reviews[0].rate).to.equal(3)
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Game.create({ author: new ObjectId(), name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
            .then(game => getGameReviews('66ba007f874aa7b84ec54491', game.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing game', () => {
        let _error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => getGameReviews(user.id, '66ba007f874aa7b84ec54491'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('game not found')
            })
    })

    it('fails on non-existing author', () => {
        let _error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => {
                return Game.create({ author: new ObjectId('66ba007f874aa7b84ec54491'), name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
                    .then(game => {
                        return Review.create({ author: new ObjectId('66ba007f874aa7b84ec54491'), game: game.id, comment: 'great game', rate: 3 })
                            .then(review => getGameReviews(user.id, game.id))
                    })
            })
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('author not found')
            })

    })

    it('fails on non-string userId', () => {
        let error

        try {
            getGameReviews(123, '66ba007f874aa7b84ec54491')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on invalid userId', () => {
        let error

        try {
            getGameReviews('123', '66ba007f874aa7b84ec54491')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string gameId', () => {
        let error

        try {
            getGameReviews('66ba007f874aa7b84ec54491', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('gameId is not a string')
        }
    })

    it('fails on invalid gameId', () => {
        let error

        try {
            getGameReviews('66ba007f874aa7b84ec54491', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid gameId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Game.deleteMany(), Review.deleteMany()]))

    after(() => mongoose.disconnect())
})