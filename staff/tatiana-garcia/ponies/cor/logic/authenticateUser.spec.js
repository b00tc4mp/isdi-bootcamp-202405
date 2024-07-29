import 'dotenv/config'
import mongoose from 'mongoose'
import authenticateUser from './authenticateUser.js'

import { expect } from 'chai'
import { User } from '../data/models.js'
import { errors } from '../../com/index.js'

const { NotFoundError, CredentialsError, ValidationError } = errors

describe('authenticateUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeds on username and password is correct ', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                authenticateUser('tatig', '123123123', error => {
                    expect(error).to.be.null
                    done()

                })
            })
            .catch(error => done(error))
    })

    it('fails when username is correct but password is incorrect', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                authenticateUser('tatig', '174583223', error => {
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal('wrong password')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails when password is correct but username is incorrect', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                authenticateUser('abtg', '123123123', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails when callback is not a function', () => {
        let error

        try {
            authenticateUser('tatig', '123123123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

    it('fails when password is not a string', () => {
        let error

        try {
            authenticateUser('tatig', 123123123, error => { })
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
            authenticateUser(125, '123123123', error => { })
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
            authenticateUser('tatig', '123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    afterEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})