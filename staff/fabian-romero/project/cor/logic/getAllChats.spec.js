import 'dotenv/config'

import getAllChats from './getAllChats.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Chat } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllChats', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    it('succeeds on existing user listing all chats', () => {
        return User.create({ name: 'rosa', surname: 'fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user =>
                User.create({ name: 'paquito', surname: 'chocolatero', email: 'paquito@chocolatero.com', username: 'paquito', password: '123123123', avatar: 'http://avatar.com/123' })
                    .then(targetUser =>
                        Chat.create({ participants: [user.id, targetUser.id] })
                            .then(chat =>
                                getAllChats(user.id)
                                    .then(chats => {
                                        expect(chats).to.be.instanceOf(Array)
                                        expect(chats).to.have.length(1)
                                        expect(chats[0].id).to.equal(chat.id)
                                        expect(chats[0].participant.id).to.equal(targetUser.id)
                                        expect(chats[0].participant.avatar).to.equal('http://avatar.com/123')
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllChats(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllChats(123)
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
            getAllChats('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    after(() => mongoose.disconnect())
})