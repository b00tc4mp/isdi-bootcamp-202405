import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import searchUser from './searchUser.js'
import { User, Game } from '../data/models.js'

import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

const img = 'https://store-images.s-microsoft.com/image/apps.54354.13510798882606697.7a42c472-75d7-487e-9538-ebb5ce1657e6.372723d8-dd1a-450a-9fed-d420e7705e4e?mode=scale&q=90&h=300&w=200'

const link = 'https://www.microsoft.com/en-us/p/candy-crush-saga/9nblggh18846?activetab=pivot:overviewtab'

describe('searchUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on returning users', () =>
        User.create({ username: 'monoloco', email: 'mono@loco.com', password: '12312323' })
            .then(user => {
                return User.create({ username: 'eden', email: 'marti@herms.com', password: '12312323' })
                    .then(() => searchUser(user.id, 'eden'))
            })
            .then(users => {
                expect(users[0].username).to.equal('eden')
            })
    )

    it('fails on non-existing user', () => {
        let error

        return searchUser('66ba007f874aa7b84ec54491', 'candy crush')
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            searchUser(123, 'candy crush')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string query', () => {
        let error

        try {
            searchUser('66ba007f874aa7b84ec54491', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('query is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})