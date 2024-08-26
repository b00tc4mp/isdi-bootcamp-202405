import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import sendMessage from './sendMessage.js'
import { User, Chat, Message } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('sendMessage', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    it('succeeds on sending a message', () => {
        return Promise.all([User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' }), User.create({ username: 'eden', email: 'marti@herms.com', password: '123123123' })])
            .then(([user1, user2]) =>
                Chat.create({ participants: [user1._id, user2._id] })
                    .then(chat =>
                        sendMessage(user1.id, chat.id, 'hello')
                            .then(() => Message.findOne({ author: user1.id }))
                            .then(message => {
                                expect(message).to.not.be.null
                                expect(message.content).to.equal('hello')
                                return Chat.findById(chat.id)
                            })
                            .then(chat => {
                                expect(chat.messages).to.have.lengthOf(1)
                            })
                    )
            )
    })

    it('fails on non-existing user', () => {
        let error

        return sendMessage('66c0ae22930f95c985427ece', '66c0ae22930f95c985427ece', 'hello')
            .catch(_error => {
                error = _error
            })
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing chat', () => {
        let error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => sendMessage(user.id, '66c0ae22930f95c985427ece', 'hello'))
            .catch(_error => {
                error = _error
            })
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('chat not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            sendMessage(123, '66c0ae22930f95c985427ece', 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string chatId', () => {
        let error

        try {
            sendMessage('66c0ae22930f95c985427ece', 123, 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('chatId is not a string')
        }
    })

    it('fails on non-string content', () => {
        let error

        try {
            sendMessage('66c0ae22930f95c985427ece', '66c0ae22930f95c985427ece', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('content is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    after(() => mongoose.disconnect())

})