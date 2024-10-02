import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getChatParticipant from './getChatParticipant.js'
import { User, Chat } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError, PermissionError } = errors

describe('getChatParticipant', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    it('succeeds on existing user', () => {

        return User.create({ name: 'Paquito', surname: 'Chocolatero', email: 'paquito@chocolatero.com', username: 'paquito', password: '123123123' })
            .then(user =>
                User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123', avatar: 'http://avatar.com/123' })
                    .then(targetUser =>
                        Chat.create({ participants: [user.id, targetUser.id] })
                            .then(chat =>
                                getChatParticipant(user.id, chat.id)
                                    .then(chatResult => {
                                        expect(chatResult).to.be.instanceOf(Object)
                                        expect(chatResult.id).to.equal(chat.id)
                                        expect(chatResult.date.toString()).to.equal(chat.date.toString())
                                        expect(chatResult.participant.id).to.equal(targetUser.id)
                                        expect(chatResult.participant.avatar).to.equal(targetUser.avatar)
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getChatParticipant(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing chat', () => {
        let _error

        return User.create({ name: 'maria', surname: 'luz', email: 'maria@luz.com', username: 'mariluz', password: '123123123' })
            .then(user => getChatParticipant(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('chat not found')
            })
    })

    it('fails on permission denied', () => {
        let _error

        debugger

        return User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user =>
                User.create({ name: 'Paquito', surname: 'Chocolatero', email: 'paquito@deponte.com', username: 'paquito', password: '123123123' })
                    .then(user2 =>
                        Chat.create({ participants: [user.id, new ObjectId().toString()] })
                            .then(chat => {
                                return getChatParticipant(user2.id, chat.id)
                                    .catch(error => _error = error)
                                    .finally(() => {
                                        expect(_error).to.be.instanceOf(PermissionError)
                                        expect(_error.message).to.equal('permission denied')
                                    })
                            })
                    )
            )
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'maria', surname: 'luz', email: 'rmari@luz.com', username: 'mariluz', password: '123123123' })
            .then(user =>
                Chat.create({ participants: [user.id, new ObjectId().toString()] })
                    .then(chat => {
                        return getChatParticipant(user.id, chat.id)
                            .catch(error => _error = error)
                            .finally(() => {
                                expect(_error).to.be.instanceOf(NotFoundError)
                                expect(_error.message).to.equal('targetUser not found')
                            })
                    })
            )
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getChatParticipant(123, new ObjectId().toString())
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
            getChatParticipant('', new ObjectId().toString())
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
            getChatParticipant(new ObjectId().toString(), 123)
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
            getChatParticipant(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid chatId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    after(() => mongoose.disconnect())
})