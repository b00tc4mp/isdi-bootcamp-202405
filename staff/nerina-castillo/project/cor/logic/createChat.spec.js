import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Chat } from '../data/models.js'
import { errors } from '../../com/index.js'
import createChat from './createChat.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('createChat', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    it('succeeds on create chat', () => {
        let user1
        let user2

        return Promise.all([
            User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' }),
            User.create({ name: 'julito', username: 'julitocamelas', role: 'user', email: 'julito@camelas.com', password: 'julito123' })
        ])
            .then(users => {
                user1 = users[0]
                user2 = users[1]
                return createChat([user1._id.toString(), user2._id.toString()])
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

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                return createChat([user._id.toString(), new ObjectId().toString()])
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('user or users not found')
                    })
            })
    })

    it('fails on less than two users', () => {
        let error

        try {
            createChat([new ObjectId().toString()])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userIds')
        }
    })

    it('fails on non-array userIds', () => {
        let error

        try {
            createChat('userIds')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userIds is not an array')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    after(() => mongoose.disconnect())
})