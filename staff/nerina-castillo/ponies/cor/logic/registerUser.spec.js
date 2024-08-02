import 'dotenv/config'
import registerUser from "./registerUser.js";
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User } from '../data/models.js';
import mongoose from 'mongoose';
import { errors } from '../../com/index.js'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany().exec())

    it('succeeds on new user', () =>
        registerUser('gon', 'zalo', 'gon@zalo.com', 'gonzalo', 'gonzalo123', 'gonzalo123')
            .then(() => User.findOne({ username: 'gonzalo' }).lean())
            .then(user => {
                expect(user).to.not.be.null
                expect(user.name).to.equal('gon')
                expect(user.surname).to.equal('zalo')
                expect(user.email).to.equal('gon@zalo.com')

                return bcrypt.compare('gonzalo123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => registerUser('gon', 'zalo', 'gon@zalo.com', 'gonzalo2', 'gonzalo123', 'gonzalo123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => registerUser('gon', 'zalo', 'gon@zalo2.com', 'gonzalo', 'gonzalo123', 'gonzalo123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'zalo', 'gon@zalo.com', 'gonzalo2', 'gonzalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerUser('', 'zalo', 'gon@zalo.com', 'gonzalo2', 'gonzalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on invalid surname', () => {
        let error

        try {
            registerUser('gon', '', 'gon@zalo.com', 'gonzalo', 'gonzalo123', 'gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid surname')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('gon', 'zalo', 123, 'gonzalo', 'gonzalo123', 'gonzalo123')
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
            registerUser('gon', 'zalo', '', 'gonzalo', 'gonzalo123', 'gonzalo123')
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
            registerUser('gon', 'zalo', 'gon@zalo.com', 123, 'gonzalo123', 'gonzalo123')
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
            registerUser('gon', 'zalo', 'gon@zalo.com', '', 'gonzalo123', 'gonzalo123')
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
            registerUser('gon', 'zalo', 'gon@zalo.com', 'gonzalo', 123123123, 'gonzalo123')
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
            registerUser('gon', 'zalo', 'gon@zalo.com', 'gonzalo', 'gonza1', 'gonzalo123')
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
            registerUser('gon', 'zalo', 'gon@zalo.com', 'gonzalo', '123123 123', '123123123')
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
            registerUser('gon', 'zalo', 'gon@zalo.com', 'gonzalo', 'gonzalo123', '_gonzalo123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    afterEach(() => User.deleteMany().exec())

    after(() => mongoose.disconnect())
})
