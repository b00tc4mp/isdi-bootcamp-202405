import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
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

    it('succeeds on new user', done => {
        registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '123123123', '123123123', error => {
            if (error) {
                done(error)

                return
            }

            User.findOne({ username: 'monoloco' }).lean()
                .then(user => {
                    expect(user.name).to.equal('Mono')
                    expect(user.surname).to.equal('Loco')
                    expect(user.email).to.equal('mono@loco.com')

                    bcrypt.compare('123123123', user.password)
                        .then(match => {
                            expect(match).to.be.true

                            done()
                        })
                        .catch(error => done(error))
                })
                .catch(error => done(error))
        })
    })

    it('fails on existing user with same email', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco2', '123123123', '123123123', error => {
                    expect(error).to.be.instanceOf(DuplicityError)
                    expect(error.message).to.equal('Email already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user with same username', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123123', '123123123', error => {
                    expect(error).to.be.instanceOf(DuplicityError)
                    expect(error.message).to.equal('Username already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Loco', 'mono@loco2.com', 'monoloco', '123123123', '123123123', error => { })
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
            registerUser('', 'Loco', 'mono@loco2.com', 'monoloco', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid name')
        }
    })

    it('fails on non-string surame', () => {
        let error

        try {
            registerUser('Mono', 123, 'mono@loco2.com', 'monoloco', '123123123', '123123123', error => { })
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
            registerUser('Mono', '', 'mono@loco2.com', 'monoloco', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid surname')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 123, 'monoloco', '123123123', '123123123', error => { })
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
            registerUser('Mono', 'Loco', '', 'monoloco', '123123123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid email')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco2.com', 123, '123123123', '123123123', error => { })
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
            registerUser('Mono', 'Loco', 'mono@loco2.com', '', '123123123', '123123123', error => { })
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
            registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', 123123123, '123123123', error => { })
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
            registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123', '123123123', error => { })
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
            registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123 123', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Password has empty spaces')
        }
    })

    it('fails on non-matching passwords', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123123', '1231231234', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Passwords do not match')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123123', '123123123', 123)
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
