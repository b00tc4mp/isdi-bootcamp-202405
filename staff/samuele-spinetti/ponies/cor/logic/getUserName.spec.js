import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import getUserName from './getUserName.js'
import { User } from '../data/models.js'

describe('getUserName', () => {
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
    //TODO error
    it('succeeds on existing user and target user', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@lspine.com', username: 'samuspine', password: '123123123' })
                    .then(user1 => {
                        getUserName(user.username, user1.username, (error, user1) => {
                            expect(user1.name).to.equal('Samu')

                            done()
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })


    it('fails on non-existing user', done => {
        getUserName('monoloco', 'monoloco', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('User not found')

            done()
        })
    })


    it('fails on non-existing targetUser', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                getUserName(user.username, 'samuspine', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('Target user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserName(123, 'monoloco', error => { })
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
            getUserName('', 'monoloco', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string targetUsername', () => {
        let error

        try {
            getUserName('monoloco', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid tagretUsername', () => {
        let error

        try {
            getUserName('monoloco', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            getUserName('monoloco', 'monoloco', 123)
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