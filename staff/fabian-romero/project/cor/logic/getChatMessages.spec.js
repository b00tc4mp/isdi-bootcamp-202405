import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Message, Chat } from '../data/models.js'
import errors from '../../com/errors.js'
import getChatMessages from './getChatMessages.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getChatMessages', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    it('succeeds on existing user and listing messages', () => {
        debugger
        return User.create({ name: 'Rosa', surname: 'Fit', username: 'rosafit', email: 'rosa@fit.com', password: '123123123' })
            .then(user =>
                User.create({ name: 'paquito', surname: 'chocolatero', username: 'paquito', email: 'paquito@chocolatero.com', password: '123123123' })
                    .then(targetUser =>
                        Chat.create({ participants: [user.id, targetUser.id] })
                            .then(chat =>
                                Message.create({ chat: chat.id, author: user.id, message: 'hello' })
                                    .then(message1 =>
                                        Message.create({ chat: chat.id, author: user.id, message: 'hello to you too' })
                                            .then(message2 =>
                                                getChatMessages(user.id, targetUser.id)
                                                    .then(messages => {
                                                        expect(messages).to.have.lengthOf(2)
                                                        expect(messages[0].text).to.equal(message1.text)
                                                        expect(messages[0].author.id).to.equal(user.id)
                                                        expect(messages[1].text).to.equal(message2.text)
                                                        expect(messages[1].author.id).to.equal(user.id)
                                                    })
                                            )
                                    )
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getChatMessages(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'Rouse', surname: 'Fiting', username: 'rosafiting', email: 'rosa@fit.com', password: '123123123' })
            .then(user => getChatMessages(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('targetUser not found')
            })
    })

    it('fails on non-existing chat', () => {
        let _error

        return User.create({ name: 'Rosa', surname: 'Fit', username: 'rosafit', email: 'rosa@fit.com', password: '123123123' })
            .then(user =>
                User.create({ name: 'paquito', surname: 'chocolatero', username: 'paquito', email: 'paquito@chocolatero.com', password: '123123123' })
                    .then(targetUser => getChatMessages(user.id, targetUser.id))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('chat not found')
                    })
            )
    })

    it('fails on non existing author', () => {
        return User.create({ name: 'rouse', surname: 'fitness', username: 'rousefitness', email: 'rosa@fitness.com', password: '123123123' })
            .then(user =>
                User.create({ name: 'paquito', surname: 'chocolatero', username: 'paquito', email: 'paquito@chocolatero.com', password: '123123123' })
                    .then(targetUser =>
                        Chat.create({ participants: [user.id, targetUser.id] })
                            .then(chat =>
                                Message.create({ chat: chat.id, author: new ObjectId().toString(), message: 'Hola!' })
                                    .then(() =>
                                        getChatMessages(user.id, targetUser.id)
                                            .catch(error => {
                                                expect(error.message).to.equal('author not found')
                                            })
                                    )
                            )
                    )
            )
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getChatMessages(123, new ObjectId().toString())
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
            getChatMessages('', new ObjectId().toString())
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
            getChatMessages(new ObjectId().toString(), 123)
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
            getChatMessages(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUserId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    after(() => mongoose.disconnect())
})