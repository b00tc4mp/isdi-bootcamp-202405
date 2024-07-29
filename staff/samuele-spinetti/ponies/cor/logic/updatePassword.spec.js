import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

describe('updatePassword', () => {
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

    it('succeeds on existing user', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                updatePassword(user.username, '123123123', '123456789', error => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    User.findOne({ username: 'monoloco' }).lean()
                        .then(user => {
                            expect(user.username).to.equal('monoloco')
                            expect(user.password).to.equal('123456789')

                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', () => {
        updatePassword('monoloco', '123123123', '123456789', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('User not found')
        })
    })

    it('fails on non matching passwords', () => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                updatePassword(user.username, '123123124', '123456789', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('Invalid password')
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            updatePassword(123, '123123123', '123456789', error => { })
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
            updatePassword('', '123123123', '123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string oldpassword', () => {
        let error

        try {
            updatePassword('monoloco', 123123123, '123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on oldpassword too short', () => {
        let error

        try {
            updatePassword('monoloco', '123123', '123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(RangeError)
            expect(error.message).to.equal('Password length is lower than 8 character')
        }
    })

    it('fails on oldpassword with spaces', () => {
        let error

        try {
            updatePassword('monoloco', '123123 123', '123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Password has empty spaces')
        }
    })

    it('fails on non-string newpassword', () => {
        let error

        try {
            updatePassword('monoloco', '123123123', 123456789, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on newpassword too short', () => {
        let error

        try {
            updatePassword('monoloco', '123123123', '1234', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(RangeError)
            expect(error.message).to.equal('Password length is lower than 8 character')
        }
    })

    it('fails on newpassword with spaces', () => {
        let error

        try {
            updatePassword('monoloco', '123123123', '1234 56789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Password has empty spaces')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            updatePassword('monoloco', '123123123', '123123123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
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
