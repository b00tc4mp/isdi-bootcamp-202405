import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import getUser from './getUser.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUser(user.username, user.username))
            .then(() => {
                expect(targetUser.name).to.equal('Mono')
                expect(targetUser.surname).to.equal('Loco')
                expect(targetUser.email).to.equal('mono@loco.com')
                expect(targetUser.username).to.equal('monoloco')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUser('monoloco', 'monoloco')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUser(123, 'monoloco')
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
            getUser('', 'monoloco')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string targetUsername', () => {
        let error

        try {
            getUser('monoloco', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid tagretUsername', () => {
        let error

        try {
            getUser('monoloco', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})