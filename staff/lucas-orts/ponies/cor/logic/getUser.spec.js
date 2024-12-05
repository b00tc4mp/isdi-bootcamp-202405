import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { errors } from 'com'

import getUser from './getUser.js'
import { User } from '../data/models.js'

const { NotFoundError, ValidationError } = errors

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
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(user => {
                getUser(user.username, user.username, (error, targetUser) => {
                    expect(targetUser.name).to.equal('Tomas')
                    expect(targetUser.surname).to.equal('Turbao')
                    expect(targetUser.email).to.equal('tomas@turbao.com')
                    expect(targetUser.username).to.equal('Tomasturbao')

                    done()
                })
            })
            .catch(error => done(error))
    })


    it('fails on non-existing user', done => {
        getUser('Tomasturbao', 'Tomasturbao', error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')

            done()
        })
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUser(123, 'Tomasturbao', error => { })
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
            getUser('', 'Tomasturbao', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string targetUsername', () => {
        let error

        try {
            getUser('Tomasturbao', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUsername is not a string')
        }
    })

    it('fails on invalid tagretUsername', () => {
        let error

        try {
            getUser('Tomasturbao', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUsername')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            getUser('Tomasturbao', 'Tomasturbao', 123)
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

