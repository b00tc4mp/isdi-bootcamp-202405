import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getChatMessages from './getChatMessages.js'
import { User, Chat, Message } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('getChatMessages', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    it('succeeds on returning chat messages', () => {
        return Promise.all([User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' }), User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })])
            .then(([user1, user2]) =>
                Chat.create({ participants: [user1._id, user2._id] })
                    .then(chat =>
                        Message.create({ author: user1.id, content: 'hello' })
                            .then(message => Chat.findByIdAndUpdate(chat.id, { $push: { messages: message.id } }))
                            .then(() => getChatMessages(user1.id, chat.id))
                            .then(messages => {
                                expect(messages).to.be.an('array')
                                expect(messages.length).to.equal(1)
                                expect(messages[0].content).to.equal('hello')
                            })
                    )
            )
    })

    it('succeeds on existing user and no posts returning empty array ', () => {
        return Promise.all([User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' }), User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })])
            .then(([user1, user2]) =>
                Chat.create({ participants: [user1._id, user2._id] })
                    .then(chat => getChatMessages(user1.id, chat.id))
                    .then(messages => {
                        expect(messages).to.be.an('array')
                        expect(messages.length).to.equal(0)
                    })
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return Chat.create({ participants: [new ObjectId(), new ObjectId()] })
            .then(chat => getChatMessages('66ba007f874aa7b84ec54491', chat.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing chat', () => {
        let _error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => getChatMessages(user.id, '66ba007f874aa7b84ec54491'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('chat not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getChatMessages(123, '66ba007f874aa7b84ec54491')
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
            getChatMessages('123', '66ba007f874aa7b84ec54491')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string chatId', () => {
        let error

        try {
            getChatMessages('66ba007f874aa7b84ec54491', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('chatId is not a string')
        }
    })

    it('fails on invalid chatId', () => {
        let error

        try {
            getChatMessages('66ba007f874aa7b84ec54491', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid chatId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    after(() => mongoose.disconnect())
})