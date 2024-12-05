import 'dotenv/config'
import toggleUserFollow from './toggleUserFollow.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, OutOfBoundsError, ValidationError, CorruptedInfoError } = errors

describe('toggleUserFollow', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing users and and user1 is not following user2', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' }))
            .then(_user => toggleUserFollow('monoloco', 'eden'))
            .then(() => User.findOne({ username: 'monoloco' }))
            .then(user => {
                return User.findOne({ username: 'eden' })
                    .then(_user => {
                        expect(_user.followers).to.include(user._id)
                        expect(user.following).to.include(_user._id)
                    })
            })
    })

    it('succeeds on existing users and user1 is following user2', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                return User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123', followers: [user._id] })
                    .then(_user => User.updateOne({ username: user.username }, { $set: { following: [_user._id] } }))
            })
            .then(() => toggleUserFollow('monoloco', 'eden'))
            .then(() => User.findOne({ username: 'monoloco' }))
            .then(user => {
                return User.findOne({ username: 'eden' })
                    .then(_user => {
                        expect(user.following).to.not.include(_user._id)
                        expect(_user.followers).to.not.include(user._id)
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
            .then(() => toggleUserFollow('monoloco', 'eden'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on user being targetUser', () => {
        let _error

        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => toggleUserFollow('monoloco', 'monoloco'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(OutOfBoundsError)
                expect(_error.message).to.equal('tried following yourself')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => toggleUserFollow('monoloco', 'eden'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('targetUser not found')
            })
    })

    it('fails on user1 following user2 but user 2 is not being followed by user1', () => {
        let _error

        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123', followers: [user._id] }))
            .then(_user => toggleUserFollow('monoloco', 'eden'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CorruptedInfoError)
                expect(_error.message).to.equal('wrong saved information')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleUserFollow(123, 'eden')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            toggleUserFollow('', 'eden')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string targetUser', () => {
        let error

        try {
            toggleUserFollow('monoloco', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUsername is not a string')
        }
    })

    it('fails on invalid targetUser', () => {
        let error

        try {
            toggleUserFollow('monoloco', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUsername')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})