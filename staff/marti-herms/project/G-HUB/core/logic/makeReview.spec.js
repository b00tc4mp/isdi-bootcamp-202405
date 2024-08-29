import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import makeReview from './makeReview.js'
import { User, Game, Review } from '../data/models.js'

import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

const img = 'https://store-images.s-microsoft.com/image/apps.54354.13510798882606697.7a42c472-75d7-487e-9538-ebb5ce1657e6.372723d8-dd1a-450a-9fed-d420e7705e4e?mode=scale&q=90&h=300&w=200'

const link = 'https://www.microsoft.com/en-us/p/candy-crush-saga/9nblggh18846?activetab=pivot:overviewtab'

describe('makeReview', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Game.deleteMany(), Review.deleteMany()]))

    it('succeds on new review without rating', () =>
        User.create({ username: 'monoloco', email: 'mono@loco.com', password: '12312323' })
            .then(user =>
                Game.create({ author: user.id, name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
                    .then(game =>
                        makeReview(user.id, game.id, 'great game')
                    )
            )
            .then(review => {
                expect(review.comment).to.equal('great game')
                expect(review.rate).to.equal(0)
            })
    )

    it('succeds on new review with rating', () =>
        User.create({ username: 'monoloco', email: 'mono@loco.com', password: '12312323' })
            .then(user =>
                Game.create({ author: user.id, name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
                    .then(game =>
                        makeReview(user.id, game.id, 'great game', 3)
                    )
            )
            .then(review => {
                expect(review.comment).to.equal('great game')
                expect(review.rate).to.equal(3)
            })
    )

    it('fails on non-existing author', () => {
        let error

        return makeReview('66b9e687cfa7ce5e041652b3', '66b9e687cfa7ce5e041652b3', 'great game', 3)
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal('author not found')
            })
    })

    it('fails on non-existing game', () => {
        let error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '12312323' })
            .then(user => makeReview(user.id, '66b9e687cfa7ce5e041652b3', 'great game', 3))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal('game not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            makeReview(123, '66b9e687cfa7ce5e041652b3', 'great game', 3)
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
            makeReview('123', '66b9e687cfa7ce5e041652b3', 'great game', 3)
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
            makeReview('66b9e687cfa7ce5e041652b3', 132, 'great game', 3)
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
            makeReview('66b9e687cfa7ce5e041652b3', '132', 'great game', 3)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid gameId')
        }
    })

    it('fails on non-string comment', () => {
        let error

        try {
            makeReview('66b9e687cfa7ce5e041652b3', '66b9e687cfa7ce5e041652b3', 123, 3)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('comment is not a string')
        }
    })

    it('fails on non-number rate', () => {
        let error

        try {
            makeReview('66b9e687cfa7ce5e041652b3', '66b9e687cfa7ce5e041652b3', 'great game', 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('rate is not a number')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Game.deleteMany(), Review.deleteMany()]))

    after(() => mongoose.disconnect())
})