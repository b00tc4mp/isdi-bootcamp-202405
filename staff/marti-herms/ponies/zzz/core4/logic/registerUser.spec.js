import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import { errors } from 'com'

const { DuplicityError, ValidationError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () => {
        return registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '123123123')
            .then(() => User.findOne({ username: 'monoloco' }).lean())
            .then(user => {
                expect(user.name).to.equal('Mono')
                expect(user.surname).to.equal('Loco')
                expect(user.email).to.equal('mono@loco.com')
            })
    })

    it('fails on existing user email', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('email already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('username already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Loco', 'mono@loco.com', 'monoloco', '123123123')
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
            registerUser('', 'Loco', 'mono@loco.com', 'monoloco', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non-string surname', () => {
        let error

        try {
            registerUser('Mono', 123, 'mono@loco.com', 'monoloco', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('surname is not a string')
        }
    })

    it('fails on invalid surname', () => {
        let error

        try {
            registerUser('Mono', '', 'mono@loco.com', 'monoloco', '123123123')
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
            registerUser('Mono', 'Loco', 123, 'monoloco', '123123123')
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
            registerUser('Mono', 'Loco', '', 'monoloco', '123123123')
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
            registerUser('Mono', 'Loco', 'mono@loco.com', 123, '123123123')
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
            registerUser('Mono', 'Loco', 'mono@loco.com', '', '123123123')
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
            registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on short password', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '12312')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is shorter tan 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '123123 123')
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