import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

describe('autheticateUser', () => {
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

    it('succeds on existing user', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user => {
                authenticateUser('samuspine', '123456789', error => {
                    expect(user.username).to.equal('samuspine')
                    expect(user.password).to.equal('123456789')

                    done()
                })
                    .catch(error => done(error))
            })
    })

    it('fails on non-existing user', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => {
                authenticateUser('samupine', '123456789', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on wrong password', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => {
                authenticateUser('samuspine', '12345679', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('wrong password')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            authenticateUser(123, '123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            authenticateUser('Samu', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password short', () => {
        let error

        try {
            authenticateUser('Samu', '1234', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(RangeError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            authenticateUser('Samu', '1234 4567', error => { })
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
            authenticateUser('Samu', '123456789', 123)
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