import 'dotenv/config'
import getUser from './getUser.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('getUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user returning user', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUser(user.id, user.id))
            .then(user => {
                expect(user).to.be.an('object')
                expect(user.username).to.equal('monoloco')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUser('66ba007f874aa7b84ec54491', '66ba007f874aa7b84ec54491')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUser(user.id, '66ba007f874aa7b84ec54491'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('target user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUser(123, '66ba007f874aa7b84ec54491')
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
            getUser('123', '66ba007f874aa7b84ec54491')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string targetUserId', () => {
        let error

        try {
            getUser('66ba007f874aa7b84ec54491', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })

    it('fails on invalid targetUserId', () => {
        let error

        try {
            getUser('66ba007f874aa7b84ec54491', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUserId')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})