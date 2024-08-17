import 'dotenv/config'
import getUserLibrary from './getUserLibrary.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Game } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

const img = 'https://store-images.s-microsoft.com/image/apps.54354.13510798882606697.7a42c472-75d7-487e-9538-ebb5ce1657e6.372723d8-dd1a-450a-9fed-d420e7705e4e?mode=scale&q=90&h=300&w=200'

const link = 'https://www.microsoft.com/en-us/p/candy-crush-saga/9nblggh18846?activetab=pivot:overviewtab'

describe('getUserLibrary', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Game.deleteMany()]))

    it('succeeds on existing user returning all games', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => {
                return Game.create({ author: user.id, name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
                    .then(game =>
                        User.findByIdAndUpdate(user.id, { $push: { library: game.id } })
                            .then(() => Game.create({ author: user.id, name: 'candy crush', image: img, description: 'candy crush game broh', link: link }))
                    )
                    .then(game =>
                        User.findByIdAndUpdate(user.id, { $push: { library: game.id } })
                            .then(() => getUserLibrary(user.id)))
            })
            .then(games => {
                expect(games).to.be.an('array')
                expect(games.length).to.equal(2)
            })
    })

    it('succeeds on existing user and no posts returning empty array ', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUserLibrary(user.id))
            .then(games => {
                expect(games).to.be.an('array')
                expect(games.length).to.equal(0)
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Game.create({ author: new ObjectId(), name: 'candy crush', image: img, description: 'candy crush game broh', link: link })
            .then(game => getUserLibrary('66ba007f874aa7b84ec54491'))
            .catch(error => _error = error)
            .finally(() => {
                console.log(_error)
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUserLibrary(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Game.deleteMany()]))

    after(() => mongoose.disconnect())
})