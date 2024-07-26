import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import registerUser from "./registerUser.js"
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

    it('succeds on new user', done => {
        registerUser("Samu", "Spine", "samu@spine.com", "samuspine", "123456789", "123456789", error => {
            if (error) {
                done(error)

                return
            }

            User.findOne({ username: 'samuspine' }).lean()
                .then(user => {
                    expect(user.name).to.equal('Samu')
                    expect(user.surname).to.equal('Spine')
                    expect(user.email).to.equal('samu@spine.com')
                    expect(user.password).to.equal('123456789')

                    done()
                })
                .catch(error => done(error))
        })
    })

    it('fails on existing user with same email', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => {
                registerUser("Samu", "Spine", "samu@spine.com", "samuspine", "123456789", "123456789", error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on exiosting user with same username', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => {
                registerUser("Samu", "Spine", "samu@spine2.com", "samuspine", "123456789", "123456789", error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user already exists')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, "Spine", "samu@spine.com", "samuspine", "123456789", "123456789", error => { })
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
            registerUser('', 'Spine', 'samu@spine2.com', 'samuspine', '123456789', '123456789', error => { })
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
            registerUser('Samu', 123, 'samu@spine2.com', 'samuspine', '123456789', '123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('surname is not a string')
        }
    })

    it('fails on invalidad surname', () => {
        let error

        try {
            registerUser('Samu', '', 'samu@spine2.com', 'samuspine', '123456789', '123456789', error => { })
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
            registerUser('Samu', 'Spine', 123, 'samuspine', '123456789', '123456789', error => { })
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
            registerUser('Samu', 'Spine', '', 'samuspine', '123456789', '123456789', error => { })
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
            registerUser('Samu', 'Spine', 'samu@spine.com', 123, '123456789', '123456789', error => { })
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
            registerUser('Samu', 'Spine', 'samu@spine.com', '', '123456789', '123456789', error => { })
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
            registerUser('Samu', 'Spine', 'samu@spine.com', 'samuspine', 123456789, '123456789', error => { })
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
            registerUser('Samu', 'Spine', 'samu@spine.com', 'samuspine', '123456', '123456789', error => { })
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
            registerUser('Samu', 'Spine', 'samu@spine.com', 'samuspine', '123456 789', '123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-matching passwords', () => {
        debugger
        let error

        try {
            registerUser('Samu', 'Spine', 'samu@spine.com', 'samuspine', '123456789', '_123456789', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            registerUser('Samu', 'Spine', 'samu@spine.com', 'samuspine', '123456789', '123456789', 123)
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





