import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import { errors } from 'com'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on new user', () =>
        registerUser('eden', 'marti@herms.com', '123123123', false)
            .then(() => User.findOne({ username: 'eden' }))
            .then(user => {
                expect(user.username).to.equal('eden')
                expect(user.email).to.equal('marti@herms.com')
                expect(user.role).to.equal('regular')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    it('succeds on new dev user', () =>
        registerUser('eden', 'marti@herms.com', '123123123', true)
            .then(() => User.findOne({ username: 'eden' }))
            .then(user => {
                expect(user.username).to.equal('eden')
                expect(user.email).to.equal('marti@herms.com')
                expect(user.role).to.equal('dev')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    it('fails on existing user with same email', () => {
        let error

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ username: 'eden', email: 'marti@herms.com', password: hash }))
            .then(() => registerUser('eden', 'marti@herms.com', '123123123', false))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceof(DuplicityError)
                expect(error.message).to.equal('email already in use')
            })
    })

    it('fails on existing user with same username', () => {
        let error

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ username: 'eden', email: 'marti@herms.com', password: hash }))
            .then(() => registerUser('eden', 'eden@herms.com', '123123123', false))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceof(DuplicityError)
                expect(error.message).to.equal('username already in use')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            registerUser(123, 'eden@herms.com', '123123123', false)
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
            registerUser('', 'eden@herms.com', '123123123', false)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('eden', 123, '123123123', false)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('email is not a string')
        }
    })

    it('fails on invalid email', () => {
        let error

        try {
            registerUser('eden', '', '123123123', false)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            registerUser('eden', 'eden@herms.com', 123, false)
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
            registerUser('eden', 'eden@herms.com', '123', false)
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
            registerUser('eden', 'eden@herms.com', '123 123123', false)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-boolean dev', () => {
        let error

        try {
            registerUser('eden', 'eden@herms.com', '123123123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('dev is not a boolean')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})