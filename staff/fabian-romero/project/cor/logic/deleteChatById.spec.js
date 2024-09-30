import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import deleteChatById from '../../app/logic/deleteChatById.js'
import { User, Chat } from '../data/models.js'

import { errors } from 'com'
const { ValidationError } = errors

describe('deleteChatById', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    it('succeeds on deleting chat', () => {
        User.create({ name: 'rosa', surname: 'fit', username: 'rosafit', email: 'rosa@fit.com', password: '123123123' }),
            User.create({ name: 'maria', surname: 'clarita', username: 'mariaclarita', email: 'maria@clarita.com', password: '123123123' })
                .then(users => {
                    user1 = users[0]
                    user2 = users[1]
                    return createChat(user1._id.toString(), user2._id.toString())
                        .then(chat => deleteChatById(user.id, chat.id))
                        .then(() => {
                            return Chat.find()
                                .then(chats => {
                                    expect(chats).to.be.an('array')
                                    expect(chats.length).to.equal(0)
                                })
                        })
                })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            deleteChatById(123, '60c72b2f9b1e8f001c8d4c1e')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('chatId is not a string')
        }
    })

    it('fails on non-string userId', () => {
        let error

        try {
            deleteChatById(123123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('chatId is not a string')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

    after(() => mongoose.disconnect())
})
