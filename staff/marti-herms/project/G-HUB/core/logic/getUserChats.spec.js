import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import getUserChats from './getUserChats.js'
import { User, Chat } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('getUserChats', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    it('succeeds on returning existing chat', () => {
        return Promise.all([User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' }), User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })])
            .then(([user1, user2]) =>
                Chat.create({ participants: [user1._id, user2._id] })
                    .then(chat =>
                        getUserChats(user1.id, user2.id)
                            .then(chats => {
                                expect(chats[0].id).to.equal(chat.id)
                                expect(chats[0].participants[0].toString()).to.equal(user1.id)
                                expect(chats[0].participants[1].toString()).to.equal(user2.id)
                            })
                    )
            )
    })

    it('fails on non exisiting user', () => {
        let error
        return User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })
            .then((user) => getUserChats('66c0ae22930f95c985427ece', user.id))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })

    })

    it('fails on non exisiting targetUser', () => {
        let error
        return User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })
            .then((user) => getUserChats(user.id, '66c0ae22930f95c985427ece'))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('targetUser not found')
            })

    })

    it('fails on non-string userId', () => {
        let error
        try {
            getUserChats(123, '66c0ae22930f95c985427ece')
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
            getUserChats('123', '66c0ae22930f95c985427ece')
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
            getUserChats('66c0ae22930f95c985427ece', 123)
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
            getUserChats('66c0ae22930f95c985427ece', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUserId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    after(() => mongoose.disconnect())
})
