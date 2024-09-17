import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Chat, Message } from '../data/models.js'
import { errors } from '../../com/index.js'
import sendMessage from './sendMessage.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('sendMessage', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    it('succeeds on send message', () =>
        User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user =>
                User.create({ name: 'paquito', surname: 'choco', email: 'paquito@choco.com', username: 'paquito', password: '123123123' })
                    .then(targetUser =>
                        Chat.create({ participants: [user.id, targetUser.id] })
                            .then(chat =>
                                sendMessage(user.id, chat.id, 'hello')
                                    .then(() =>
                                        Chat.findById(chat.id).lean()
                                            .then(updatedChat => {
                                                expect(updatedChat.messages).to.be.an('array').that.is.not.empty
                                                return Message.findById(updatedChat.messages[0]).lean()
                                            })
                                            .then(message => {
                                                expect(message.author.toString()).to.equal(user.id)
                                                expect(message.chat.toString()).to.equal(chat.id)
                                                expect(message.message).to.equal('hello')
                                            })
                                    )
                            )
                    )
            )

    )


    it('fails on non-existing user', () => {
        let _error

        return sendMessage(new ObjectId().toString(), new ObjectId().toString(), 'hello')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing chat', () => {
        let _error

        return User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user => sendMessage(user.id, new ObjectId().toString(), 'Hello'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('chat not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            sendMessage(123, new ObjectId().toString(), 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on ivalid userId', () => {
        let error

        try {
            sendMessage('', new ObjectId().toString(), 'hello')
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
            sendMessage(new ObjectId().toString(), 123, 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('chatId is not a string')
        }
    })

    it('fails on ivalid chatId', () => {
        let error

        try {
            sendMessage(new ObjectId().toString(), '', 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid chatId')
        }
    })

    it('fails on non-string message', () => {
        let error

        try {
            sendMessage(new ObjectId().toString(), new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('message is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    after(() => mongoose.disconnect())

})