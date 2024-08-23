import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { User, Message, Chat } from '../data/models.js'
import errors from '../../com/errors.js'
import getMessages from './getMessages.js'
import { expect } from 'chai'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getMessages', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Message.deleteMany()]))

    it('succeeds on existing user and listing messages', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Chat.create({ participants: [user.id] })
                    .then(chat =>
                        Message.create({ chat: chat.id, author: user.id, text: 'hello!' })  // Cambiado a chat.id
                            .then(message1 =>
                                Message.create({ chat: chat.id, author: user.id, text: 'how are you?' })  // Cambiado a chat.id
                                    .then(message2 =>
                                        getMessages(user.id, chat.id)
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
    })

    it('fails if the author of a message is not found', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Chat.create({ participants: [user.id] })
                    .then(chat =>
                        Message.create({ chat: chat.id, author: new ObjectId().toString(), text: 'hello!' })
                            .then(() =>
                                getMessages(user.id, chat.id)
                                    .catch(error => {
                                        expect(error.message).to.equal('author not found')
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getMessages(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getMessages(123, new ObjectId().toString())
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
            getMessages(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('chatId is not a string')
        }
    })



    afterEach(() => Promise.all([User.deleteMany(), Message.deleteMany()]))

    after(() => mongoose.disconnect())
})