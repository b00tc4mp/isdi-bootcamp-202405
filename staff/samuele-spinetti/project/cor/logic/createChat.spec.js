import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import createChat from './createChat.js'
import { User, Chat } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError } = errors

describe('createChat', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    it('succeeds on create chat', () => {
        let user1
        let user2

        return Promise.all([
            User.create({ name: 'Samue', surname: 'Spine', username: 'samu', email: 'samu@spine.com', password: '123123123' }),
            User.create({ name: 'Lili', surname: 'Deponte', username: 'lili', email: 'lili@deponte.com', password: '123123123' })
        ])
            .then(users => {
                user1 = users[0]
                user2 = users[1]
                return createChat(user1._id.toString(), user2._id.toString())
            })
            .then(chatId => {
                expect(chatId).to.exist
                return Chat.findById(chatId)
            })
            .then(chat => {
                expect(chat).to.exist
                expect(chat.participants.map(participant => participant.toString())).to.have.members([user1._id.toString(), user2._id.toString()])
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return createChat(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing target user', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user => createChat(user.id, new ObjectId().toString(), 'Hello'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('targetUser not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createChat(123, new ObjectId().toString())
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
            createChat('', new ObjectId().toString())
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
            createChat(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })

    it('fails on ivalid targetUserId', () => {
        let error

        try {
            createChat(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUserId')
        }
    })

    afterEach(() => Promise.all([User.deleteMany, Chat.deleteMany()]))

    after(() => mongoose.disconnect())
})