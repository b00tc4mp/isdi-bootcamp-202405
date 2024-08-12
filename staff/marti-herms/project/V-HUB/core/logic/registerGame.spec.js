import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import registerGame from './registerGame.js'
import { User, Game } from '../data/models.js'

import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

const img = 'https://store-images.s-microsoft.com/image/apps.54354.13510798882606697.7a42c472-75d7-487e-9538-ebb5ce1657e6.372723d8-dd1a-450a-9fed-d420e7705e4e?mode=scale&q=90&h=300&w=200'

const link = 'https://www.microsoft.com/en-us/p/candy-crush-saga/9nblggh18846?activetab=pivot:overviewtab'

describe('registerGame', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on new game', () =>
        User.create({ username: 'monoloco', email: 'mono@loco.com', password: '12312323' })
            .then(user => {
                return registerGame(user.id, 'candy crush', img, 'candy crush game broh', link)
                    .then(() => User.findById(user.id))
            })
            .then(user => {
                Game.findOne({ name: 'candy crush' })
                    .then(game => {
                        expect(user.games[0]).to.equal(game.id)
                        expect(game.img).to.equal(img)
                        expect(game.description).to.equal('candy crush game broh')
                        expect(game.link).to.equal(link)
                    })
            })
    )

    it('fails on non-existing user', () => {
        let error

        return registerGame('66b9e687cfa7ce5e041652b3', 'candy crush', img, 'candy crush game broh', link)
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            registerGame(123, 'candy crush', img, 'candy crush game broh', link)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerGame('66b9e687cfa7ce5e041652b3', 213, img, 'candy crush game broh', link)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            registerGame('66b9e687cfa7ce5e041652b3', 'candy crush', 123, 'candy crush game broh', link)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on non-string description', () => {
        let error

        try {
            registerGame('66b9e687cfa7ce5e041652b3', 'candy crush', img, 123, link)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('description is not a string')
        }
    })

    it('fails on non-string link', () => {
        let error

        try {
            registerGame('66b9e687cfa7ce5e041652b3', 'candy crush', img, 'candy crush game broh', 6123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('link is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})