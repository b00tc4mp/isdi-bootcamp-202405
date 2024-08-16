import 'dotenv/config'
import getUserAvatar from './getUserAvatar.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

const img = 'https://imgs.search.brave.com/mYuKqM8YeN3Xo0rk0ioz3wRsMz8tw2c9O8pUk5uohlI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw'

describe('getUserAvatar', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany()]))

    it('succeeds on existing user and returning avatar', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123', avatar: img })
            .then(user => getUserAvatar(user.id))
            .then(avatar => {
                expect(avatar).to.equal(img)
            })
    })

    it('succeeds on existing user and not returning avatar', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => getUserAvatar(user.id))
            .then(avatar => {
                expect(avatar).to.equal('')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUserAvatar('66ba007f874aa7b84ec54491')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUserAvatar(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany()]))

    after(() => mongoose.disconnect())
})