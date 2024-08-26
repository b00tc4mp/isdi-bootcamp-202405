import 'dotenv/config'
import toggleFavGame from './toggleFavGame.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Game } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

const img = 'https://store-images.s-microsoft.com/image/apps.54354.13510798882606697.7a42c472-75d7-487e-9538-ebb5ce1657e6.372723d8-dd1a-450a-9fed-d420e7705e4e?mode=scale&q=90&h=300&w=200'

const link = 'https://www.microsoft.com/en-us/p/candy-crush-saga/9nblggh18846?activetab=pivot:overviewtab'

describe('toggleFavGame', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Game.deleteMany()]))

    it('succeeds on existing user and game and game is in user favs', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user =>
                Game.create({ author: user.id, name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
                    .then(game =>
                        toggleFavGame(user.id, game.id)
                            .then(() => User.findOne({ username: 'monoloco' }))
                            .then(user => {
                                expect(user.favs).to.include(game._id)
                            })
                    )
            )
    })

    it('succeeds on existing user and game and game is not in user favs', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user =>
                Game.create({ author: user.id, name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
                    .then(game =>
                        toggleFavGame(user.id, game.id)
                            .then(() => toggleFavGame(user.id, game.id))
                            .then(() => User.findOne({ username: 'monoloco' }))
                            .then(user => {
                                expect(user.favs).to.not.include(game._id)
                                expect(user.favs.length).to.equal(0)
                            })
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return toggleFavGame('66ba313a881fabd96394b179', '66ba007f874aa7b84ec54491')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing game', () => {
        let _error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => toggleFavGame(user.id, '66ba007f874aa7b84ec54491'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('game not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleFavGame(123, '66ba007f874aa7b84ec54491')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string gameId', () => {
        let error

        try {
            toggleFavGame('66ba313a881fabd96394b179', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('gameId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Game.deleteMany()]))

    after(() => mongoose.disconnect())
})