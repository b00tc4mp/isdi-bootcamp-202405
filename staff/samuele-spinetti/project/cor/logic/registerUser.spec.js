import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser('Samu', 'Spine', 'samuspine', 'samu@spine.com', '123123123', '123123123')
            .then(() => User.findOne({ username: 'samuspine' }).lean())
            .then(user => {
                expect(user.name).to.equal('Samu')
                expect(user.surname).to.equal('Spine')
                expect(user.email).to.equal('samu@spine.com')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(() => registerUser('Samu', 'Spine', 'samuspine2', 'samu@spine.com', '123123123', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('email already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(() => registerUser('Samu', 'Spine', 'samuspine', 'samu@spine2.com', '123123123', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('username already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Spine', 'samuspine', 'samu@spine.com', '123123123', '123123123')
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
            registerUser('', 'Spine', 'samuspine', 'samu@spine.com', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non-string surame', () => {
        let error

        try {
            registerUser('Samu', 123, 'samuspine', 'samu@spine.com', '123123123', '123123123')
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
            registerUser('Samu', '', 'samuspine', 'samu@spine.com', '123123123', '123123123')
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
            registerUser('Samu', 'Spine', 'samuspine', 123, '123123123', '123123123')
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
            registerUser('Samu', 'Spine', 'samuspine', '', '123123123', '123123123')
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
            registerUser('Samu', 'Spine', 123, 'Samu@Spine2.com', '123123123', '123123123')
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
            registerUser('Samu', 'Spine', '', 'Samu@Spine2.com', '123123123', '123123123')
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
            registerUser('Samu', 'Spine', 'samuspine', 'samu@spine.com', 123123123, '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password too short', () => {
        let error

        try {
            registerUser('Samu', 'Spine', 'samuspine', 'samu@spine.com', '123123', '123123123')
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
            registerUser('Samu', 'Spine', 'samuspine', 'samu@spine.com', '123123 123', '123123123')
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
            registerUser('Samu', 'Spine', 'samuspine', 'samu@spine.com', '123123123', '1231231234')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
