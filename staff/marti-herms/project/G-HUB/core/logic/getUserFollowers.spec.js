import 'dotenv/config'
import getUserFollowers from './getUserFollowers.js'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('getUserFollowers', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user returning all followers', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user =>
                User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })
                    .then(_user =>
                        toggleFollowUser(user.id, _user.id)
                            .then(() => getUserFollowers(_user.id, _user.id))
                            .then(users => {
                                expect(users).to.be.an('array')
                                expect(users[0].id).to.equal(user.id)
                            })
                    )
            )
    })

    it('succeeds on existing user and returning empty array ', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user =>
                getUserFollowers(user.id, user.id)
                    .then(users => {
                        expect(users).to.be.an('array')
                        expect(users.length).to.equal(0)
                    })
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getUserFollowers('66ba007f874aa7b84ec54491', '66ba007f874aa7b84ec54491')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUserFollowers(user.id, '66ba007f874aa7b84ec54491'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('targetUser not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUserFollowers(123, '66ba007f874aa7b84ec54491')
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
            getUserFollowers('123', '66ba007f874aa7b84ec54491')
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
            getUserFollowers('66ba007f874aa7b84ec54491', 123)
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
            getUserFollowers('66ba007f874aa7b84ec54491', '123')
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