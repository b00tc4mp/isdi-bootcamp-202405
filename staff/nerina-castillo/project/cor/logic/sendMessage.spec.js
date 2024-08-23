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

    it('succeeds on sendign a message', () => {
        let userId
        let chatId

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                userId = user._id.toString()
                return Chat.create({ participants: [userId] })
            })
            .then(chat => {
                chatId = chat._id.toString()
                return sendMessage(userId, chatId, 'hello')
            })
            .then(() => Message.findOne({ author: userId }))
            .then(message => {
                expect(message).to.not.be.null
                expect(message.text).to.equal('hello')
                return Chat.findById(chatId)
            })
            .then(chat => {
                expect(chat.messages).to.have.lengthOf(1)
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return sendMessage(new ObjectId().toString(), new ObjectId().toString(), 'hello')
            .catch(error => {
                _error = error
            })
            .finally(() => {

                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing chat', () => {
        let error
        let userId

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                userId = user._id.toString()
                return sendMessage(userId, new ObjectId().toString(), 'hello')
            })
            .catch(_error => {
                error = _error
            })
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('chat not found')
            })
    })

    it('fails on invalid text', () => {
        let error
        let userId
        let chatId


        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                userId = user._id.toString()
                return Chat.create({ participants: [userId], messages: [] })
            })
            .then(chat => {
                chatId = chat._id.toString()
                return sendMessage(userId, chatId, '')
            })
            .catch(_error => {
                error = _error
            })
            .finally(() => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('invalid text')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()]))

    after(() => mongoose.disconnect())

})