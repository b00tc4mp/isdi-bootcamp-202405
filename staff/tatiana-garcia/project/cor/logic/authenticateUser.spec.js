import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { DuplicityError, CredentialsError, ValidationError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on email and password is correct', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => {
                User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: hash })
                    .then(() => authenticateUser('tati@garcia.com', '123123123'))
                    .then(value => expect(value).to.be.string)
            })
    )

    it('fails on existing user with same email', () => {
        let _error

        bcrypt.hash('123123123', 8)
            .then(hash => {
                User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: hash })
                    .then(() => authenticateUser('tati@garcia.com', '123123123'))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(DuplicityError)
                        expect(_error.message).to.equal('email already exists')
                    })
            })
    })

    it('fails on wrong password', () => {
        let error

        bcrypt.hash('123123123', 8)
            .then(hash =>
                User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: hash })
            )
            .then(() => authenticateUser('tati@garcia.com', '111111111'))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
            })
    })

    it('fails on non string email', () => {
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

    it('fails on non string password', () => {
        let error

        try {
            authenticateUser('tati@garcia.com', 123123123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password is too short', () => {
        let error

        try {
            authenticateUser('tati@garcia.com', '123')
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
            authenticateUser('tati@garcia.com', '123123 123')
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