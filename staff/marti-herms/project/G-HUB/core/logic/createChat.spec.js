import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import createChat from './createChat.js'
import { User, Chat } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('createChat', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    it('succeeds on creating new chat', () => {
        return Promise.all([User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' }), User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })])
            .then(([user1, user2]) =>
                createChat(user1.id, user2.id)
                    .then(chatId =>
                        Chat.findById(chatId).lean()
                            .then(chat => {
                                expect(chat._id.toString()).to.equal(chatId)
                                expect(chat.participants[0].toString()).to.equal(user1._id.toString())
                                expect(chat.participants[1].toString()).to.equal(user2._id.toString())
                            })
                    )
            )
    })

    it('succeds on returning existing chat', () => {
        return Promise.all([User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' }), User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })])
            .then(([user1, user2]) =>
                createChat(user1.id, user2.id)
                    .then(chatId =>
                        createChat(user1.id, user2.id)
                            .then(_chatId => {
                                expect(_chatId).to.equal(chatId)
                            })
                    )
            )
    })

    it('fails on non exisiting user', () => {
        let error
        return User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })
            .then((user) => createChat('66c0ae22930f95c985427ece', user.id))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })

    })

    it('fails on non exisiting targetUser', () => {
        let error
        return User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })
            .then((user) => createChat(user.id, '66c0ae22930f95c985427ece'))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('targetUser not found')
            })

    })

    it('fails on non-string userId', () => {
        let error
        try {
            createChat(123, '66c0ae22930f95c985427ece')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string targetUserId', () => {
        let error
        try {
            createChat('66c0ae22930f95c985427ece', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    after(() => mongoose.disconnect())
})
