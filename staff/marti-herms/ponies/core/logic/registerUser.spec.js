import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

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
        registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '123123123', error => {
            if (error) {
                done(error)

                return
            }

            User.findOne({ username: 'monoloco' }).lean()
                .then(user => {
                    expect(user.name).to.equal('Mono')
                    expect(user.surname).to.equal('Loco')
                    expect(user.email).to.equal('mono@loco.com')
                    expect(user.password).to.equal('123123123')

                    done()
                })
                .catch(error => done(error))
        })

    })

    it('fails on existing user email', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '123123123', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('email already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user with same username', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123123', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('username already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Loco', 'mono@loco.com', 'monoloco', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerUser('', 'Loco', 'mono@loco.com', 'monoloco', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non-string surname', () => {
        let error

        try {
            registerUser('Mono', 123, 'mono@loco.com', 'monoloco', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('surname is not a string')
        }
    })

    it('fails on invalid surname', () => {
        let error

        try {
            registerUser('Mono', '', 'mono@loco.com', 'monoloco', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid surname')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 123, 'monoloco', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('email is not a string')
        }
    })

    it('fails on invalid email', () => {
        let error

        try {
            registerUser('Mono', 'Loco', '', 'monoloco', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco.com', 123, '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco.com', '', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on short password', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '12312', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(RangeError)
            expect(error.message).to.equal('password is shorter tan 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco.com', 'monoloco', '123123 123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            registerUser('Mono', 'Loco', 'mono@loco2.com', 'monoloco', '123123123', '123123123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
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