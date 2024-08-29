import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Game } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('toggleFollowUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Game.deleteMany()]))

    it('succeeds on existing user and game and game is in user following', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user =>
                User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })
                    .then(_user =>
                        toggleFollowUser(user.id, _user.id)
                            .then(() => User.findOne({ username: 'monoloco' }))
                            .then(user => {
                                expect(user.following).to.include(_user._id)
                            })
                    )
            )
    })

    it('succeeds on existing user and game and game is not in user following', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user =>
                User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })
                    .then(_user =>
                        toggleFollowUser(user.id, _user.id)
                            .then(() => toggleFollowUser(user.id, _user.id))
                            .then(() => User.findOne({ username: 'monoloco' }))
                            .then(user => {
                                expect(user.following).to.not.include(_user._id)
                                expect(user.following.length).to.equal(0)
                            })
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return toggleFollowUser('66ba313a881fabd96394b179', '66ba007f874aa7b84ec54491')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => toggleFollowUser(user.id, '66ba007f874aa7b84ec54491'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('targetUser not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleFollowUser(123, '66ba007f874aa7b84ec54491')
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
            toggleFollowUser('123', '66ba007f874aa7b84ec54491')
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
            toggleFollowUser('66ba313a881fabd96394b179', 123)
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
            toggleFollowUser('66ba313a881fabd96394b179', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUserId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Game.deleteMany()]))

    after(() => mongoose.disconnect())
})