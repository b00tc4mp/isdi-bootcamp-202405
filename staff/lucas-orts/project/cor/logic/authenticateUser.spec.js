import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError, CredentialsError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on authenticate user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '630557321', address: 'calle Goteta 40, Albacete', password: hash })
            )
            .then(() => authenticateUser('ester@colero.com', '123123123'))
            .then(value => expect(value).to.be.string)
    )

    it('fails on non-existing user', () => {
        let _error

        authenticateUser('ester@colero.com', '123123123')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on passwords do not match', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '630557321', address: 'calle Goteta 40, Albacete', password: '123123123' })
            .then(user => authenticateUser(user.email, '123123124'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })
    })

    it('fails on non-string email', () => {
        let error

        try {
            authenticateUser(123, '123123123')
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
            authenticateUser('', '123123123')
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
            authenticateUser('ester@colero.com', 123123123)
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
            authenticateUser('ester@colero.com', '123123')
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
            authenticateUser('ester@colero.com', '123123 123')
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