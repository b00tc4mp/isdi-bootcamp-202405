import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('updateAvatar', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => updateAvatar(user.username, 'http://text'))

        User.findOne({ username: 'monoloco' }).lean()
            .then(user => {
                expect(user.username).to.equal('monoloco')
                expect(user.avatar).to.equal('http://text')
            })
    })


    it('fails on non-existing user', () => {
        let _error

        return updateAvatar('monoloco', 'http://text')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })


    it('fails on non-string username', () => {
        let error

        try {
            updateAvatar(123, 'http://text')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            updateAvatar('', 'http://')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string avatar', () => {
        let error

        try {
            updateAvatar('monoloco', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid avatar', () => {
        let error

        try {
            updateAvatar('monoloco', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid avatar')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
