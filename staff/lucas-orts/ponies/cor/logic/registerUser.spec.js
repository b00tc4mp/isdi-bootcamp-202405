import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { errors } from 'com'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

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
        registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', error => {
            if (error) {
                done(error)

                return
            }

            User.findOne({ username: 'Tomasturbao' }).lean()
                .then(user => {
                    expect(user.name).to.equal('Tomas')
                    expect(user.surname).to.equal('Turbao')
                    expect(user.email).to.equal('tomas@turbao.com')
                    expect(user.password).to.equal('123123123')

                    done()
                })
                .catch(error => done(error))
        })
    })

    it('fails on existing user with same email', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(() => {
                registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', error => {
                    expect(error).to.be.instanceOf(DuplicityError)
                    expect(error.message).to.equal('email already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user with same username', done => {

        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })

            .then(() => {
                registerUser('Tomas', 'Turbao', 'tomas@turbao2.com', 'Tomasturbao', '123123123', '123123123', error => {
                    expect(error).to.be.instanceOf(DuplicityError)
                    expect(error.message).to.equal('user already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', error => { })
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
            registerUser('', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', error => { })
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
            registerUser('Tomas', 123, 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', error => { })
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
            registerUser('Tomas', '', 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', 123, 'Tomasturbao', '123123123', '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', '', 'Tomasturbao', '123123123', '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 123, '123123123', '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', 'tomas@turbao.com', '', '123123123', '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', 123123123, '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123', '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123 123', '123123123', error => { })
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
            registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123123', '_123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            registerUser('Tomas', 'Turbao', 'tomas@turbao.com', 'Tomasturbao', '123123123', '123123123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
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