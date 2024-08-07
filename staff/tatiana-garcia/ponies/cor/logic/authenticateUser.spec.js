import 'dotenv/config'
import mongoose from 'mongoose'
import authenticateUser from './authenticateUser.js'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'
import { User } from '../data/models.js'
import { errors } from '../../com/index.js'

const { NotFoundError, CredentialsError, ValidationError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on username and password is correct ', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: hash }))
            .then(() => authenticateUser('tatig', '123456789'))
            .then(value => expect(value).to.be.undefined)
    )

    it('fails when username is correct but password is incorrect', () => {
        let _error

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: hash }))
            .then(() => authenticateUser('tatig', '174583223'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })
    })

    it('fails when password is correct but username is incorrect', () => {
        let _error

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: hash }))
            .then(() => authenticateUser('abtg', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails when password is not a string', () => {
        let error

        try {
            authenticateUser('tatig', 123123123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails when username is not a string', () => {
        let error

        try {
            authenticateUser(125, '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on password short', () => {
        let error

        try {
            authenticateUser('tatig', '123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})