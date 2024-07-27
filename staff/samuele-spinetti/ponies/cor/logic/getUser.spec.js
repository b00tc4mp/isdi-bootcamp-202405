import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import getUser from './getUser.js'
import { User } from '../data/models.js'

describe('getUser', () => {
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
                getUser(user.username, user.username, (error, targetUser) => {
                    expect(targetUser.name).to.equal('Mono')
                    expect(targetUser.surname).to.equal('Loco')
                    expect(targetUser.email).to.equal('mono@loco.com')
                    expect(targetUser.username).to.equal('monoloco')

                    done()
                })
            })
            .catch(error => done(error))
    })


    it('fails on non-existing user', done => {
        getUser('monoloco', 'monoloco', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('User not found')

            done()
        })
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUser(123, 'monoloco', error => { })
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
            getUser('', 'monoloco', error => { })
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
            getUser('monoloco', 123, error => { })
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
            getUser('monoloco', '', error => { })
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
            getUser('monoloco', 'monoloco', 123)
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


