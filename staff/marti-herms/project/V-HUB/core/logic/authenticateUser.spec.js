import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, CredentialsError, ValidationError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and correct password', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => {
                return User.create({ username: 'monoloco', email: 'mono@loco.com', password: hash, role: false })
                    .then(user => {
                        return authenticateUser('monoloco', '123123123')
                            .then(id => expect(id).to.equal(user.id))
                    })
            })
    )

    it('fails on non-existing user', () => {
        let error

        authenticateUser('monoloco', '123123123')
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })


    it('fails on wrong password', () => {
        let error

        return bcrypt.hash('123123123', 8)
            .then(hash =>
                User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: hash })
            )
            .then(() => authenticateUser('monoloco', '111111111'))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
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

    it('fails on password short', () => {
        let error

        try {
            authenticateUser('monoloco', '132')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            authenticateUser('monoloco', '123 123132')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})