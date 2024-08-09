import 'dotenv/config'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import { User } from '../data/models.js'
import { errors } from '../../com/index.js'

import registerUser from './registerUser.js'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany().exec())

    it('succeds on new user', () =>
        registerUser('gon', 'gonzalo', 'user', 'gon@zalo.com', 'gonzalo123', 'gonzalo123')
            .then(() => User.findOne({ username: 'gonzalo' }).lean())
            .then(user => {
                expect(user).to.not.be.null
                expect(user.name).to.equal('gon')
                expect(user.email).to.equal('gon@zalo.com')

                return bcrypt.compare('gonzalo123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(() => registerUser('gon', 'gonzalo2', 'user', 'gon@zalo.com', 'gonzalo123', 'gonzalo123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.be.equal('user already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(() => registerUser('gon', 'gonzalo', 'user', 'gon@zalo2.com', 'gonzalo123', 'gonzalo123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'gonzalo', 'user', 'gon@zalo.com', 'gonzalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.be.equal('name is not a string')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerUser('', 'gonzalo', 'user', 'gon@zalo.com', 'gonzalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on invalid role', () => {
        let error

        try {
            registerUser('gon', 'gonzalo', '', 'gon@zalo.com', 'gonzalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid role')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('gon', 'gonzalo', 'user', 123, 'gonzalo123', 'gonzalo123')
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
            registerUser('gon', 'gonzalo', 'user', '', 'gonzalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            registerUser('gon', 123, 'user', 'gon@zalo.com', 'gonzalo123', 'gonzalo123')
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
            registerUser('gon', '', 'user', 'gon@zalo.com', 'gonzalo123', 'gonzalo123')
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
            registerUser('gon', 'gonzalo', 'user', 'gon@zalo.com', 123123123, 'gonzalo123')
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
            registerUser('gon', 'gonzalo', 'user', 'gon@zalo.com', 'gon1', 'gonzalo123')
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
            registerUser('gon', 'gonzalo', 'user', 'gon@zalo.com', 'gon zalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-matching passwords', () => {
        let error

        try {
            registerUser('gon', 'gonzalo', 'user', 'gon@zalo.com', 'gonzalo123', '_gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password do not match')
        }
    })

    afterEach(() => User.deleteMany().exec())

    after(() => mongoose.disconnect())
})