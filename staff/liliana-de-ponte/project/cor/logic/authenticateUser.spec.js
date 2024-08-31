import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError, CredentialsError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on existing user and correct password', () =>
        bcrypt.hash('123456789', 8)
            .then(hash => User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: hash }))
            .then(() => authenticateUser('lilideponte', '123456789'))
            .then(value => expect(value).to.be.toString)

    )

    it('fails on non-existing user,', () => {
        let _error

        authenticateUser('lilideponte', '123456789')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceof(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })

    it('fails on passwords do not match', () => {
        let _error

        return User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(user => authenticateUser(user.username, '123456789'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceof(CredentialsError)
                expect(_error.message)
            })

    })

    it('fails on non-string username', () => {
        let error

        try {
            authenticateUser(123, '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceof(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            authenticateUser('', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceof(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            authenticateUser('lilideponte', 123456789)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceof(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password too short', () => {
        let error

        try {
            authenticateUser('lilideponte', '12345')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceof(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            authenticateUser('lilideponte', '123456 789')
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








