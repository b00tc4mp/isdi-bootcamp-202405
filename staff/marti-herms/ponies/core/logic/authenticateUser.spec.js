import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'
import { User } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError, CredentialsError, ValidationError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and correct password', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: hash }))
            .then(() => authenticateUser('monoloco', '123123123'))
            .then(value => expect(value).to.be.undefined)
    )

    it('fails on non-existing user', () => {
        let _error

        authenticateUser('monoloco', '123123123')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on wrong password', () => {
        let _error

        return bcrypt.hash('123123123', 8)
            .then(hash =>
                User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: hash })
            )
            .then(() => authenticateUser('monoloco', '111111111'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })

    })

    it('fails on non-string username', () => {
        let error

        try {
            authenticateUser(123, '123123123')
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
            authenticateUser('', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            authenticateUser('monoloco', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on invalid password', () => {
        let error

        try {
            authenticateUser('monoloco', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid password')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})