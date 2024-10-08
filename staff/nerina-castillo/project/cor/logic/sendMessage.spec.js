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

    it('succeeds on sending a message', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Chat.create({ participants: [user._id.toString()] })
                    .then(chat =>
                        sendMessage(user._id.toString(), chat._id.toString(), 'hello')
                            .then(() => Message.findOne({ author: user._id.toString() }))
                            .then(message => {
                                expect(message).to.not.be.null
                                expect(message.text).to.equal('hello')
                                return Chat.findById(chat._id.toString())
                            })
                            .then(chat => {
                                expect(chat.messages).to.have.lengthOf(1)
                            })
                    )
            )
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

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                sendMessage(user._id.toString(), new ObjectId().toString(), 'hello')
                    .catch(_error => {
                        error = _error
                    })
            )
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('chat not found')
            })
    })

    it('fails on invalid text', () => {
        let error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Chat.create({ participants: [user._id.toString()], messages: [] })
                    .then(chat =>
                        sendMessage(user._id.toString(), chat._id.toString(), '')
                    )
            )
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