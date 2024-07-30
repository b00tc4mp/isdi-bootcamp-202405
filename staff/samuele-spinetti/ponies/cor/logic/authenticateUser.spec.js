import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError, CredentialsError } = errors

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

    it('succeeds on authenticate user', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                authenticateUser('monoloco', '123123123', error => {
                    expect(user.username).to.equal('monoloco')

                    bcrypt.compare('123123123', user.password)
                        .then(match => {
                            expect(match).to.be.true

                            done()
                        })
                    console.log('User authenticated')

                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        authenticateUser('monoloco', '123123123', error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')

            done()
        })
    })

    it('fails on passwords do not match', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                authenticateUser(user.username, '123123124', error => {
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal('Wrong password')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            authenticateUser(123, '123123123', error => { })
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
            authenticateUser('', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            authenticateUser('monoloco', 123123123, error => { })
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
            authenticateUser('monoloco', '123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Password length is lower than 8 character')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            authenticateUser('monoloco', '123123 123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Password has empty spaces')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            authenticateUser('monoloco', '123123123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Callback is not a function')
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
