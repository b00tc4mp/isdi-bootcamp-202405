import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { DuplicityError, ValidationError } = errors

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
        registerUser('Tati', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', error => {
            if (error) {
                done(error)

                return
            }

            User.findOne({ username: 'tatig' }).lean()
                .then(user => {
                    expect(user.name).to.equal('Tati')
                    expect(user.surname).to.equal('Garcia')
                    expect(user.email).to.equal('tati@garcia.com')
                    expect(user.password).to.equal('123123123')

                    done()
                })
                .catch(error => done(error))
        })
    })

    it('fails on existing user with same email', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                registerUser('Tati', 'Garcia', 'tati@garcia.com', 'tatig2', '123123123', '123123123', error => {
                    expect(error).to.be.instanceOf(DuplicityError)
                    expect(error.message).to.equal('user already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user with same username', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                registerUser('Tati', 'Garcia', 'tati@garcia2.com', 'tatig', '123123123', '123123123', error => {
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
            registerUser(123, 'Tati', 'tati@garcia2.com', 'tatig', '123123123', '123123123', error => { })
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
            registerUser('P', 'Garcia', 'tati@garcia2.com', 'tatig', '123123123', '123123123', error => { })
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
            registerUser('Tati', 123, 'tati@garcia2.com', 'tatig', '123123123', '123123123', error => { })
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
            registerUser('Tati', 'p', 'tati@garcia2.com', 'tatig', '123123123', '123123123', error => { })
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
            registerUser('Tati', 'Garcia', 123, 'tatig', '123123123', '123123123', error => { })
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
            registerUser('Tati', 'Garcia', 'h', 'tatig', '123123123', '123123123', error => { })
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
            registerUser('Tati', 'Garcia', 'tati@garcia2.com', 123, '123123123', '123123123', error => { })
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
            registerUser('Tati', 'Garcia', 'tati@garcia.com', 'a', '123123123', '123123123', error => { })
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
            registerUser('Tati', 'Garcia', 'tati@garcia2.com', 'tatig', 123123123, '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password short', () => {
        let error

        try {
            registerUser('Tati', 'Garcia', 'tati@garcia2.com', 'tatig', '1231231', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on non-matching passwords', () => {
        let error

        try {
            registerUser('Tati', 'Garcia', 'tati@garcia2.com', 'tatig', '123123123', '_123123123', error => { })
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
            registerUser('Tati', 'Garcia', 'tati@garcia2.com', 'tatig', '123123123', '123123123', 1234)
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