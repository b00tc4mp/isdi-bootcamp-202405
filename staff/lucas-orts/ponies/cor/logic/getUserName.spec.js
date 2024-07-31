import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { errors } from 'com'

import getUserName from './getUserName.js'
import { User } from '../data/models.js'

const { ValidationError, NotFoundError } = errors

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

    // it('succeeds on existing user and target user', done => {
    //     User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
    //         .then(user => {
    //             User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', username: 'Estercolero', password: '123123123' })
    //                 .then(user1 => {
    //                     getUserName(user.username, user1.username, (error, user1) => {
    //                         expect(user1.name).to.equal('Ester')

    //                         done()
    //                     })
    //                 })
    //                 .catch(error => done(error))
    //         })
    //         .catch(error => done(error))
    // })


    it('fails on non-existing user', done => {
        getUserName('Tomasturbao', 'Tomasturbao', error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')

            done()
        })
    })


    it('fails on non-existing targetUser', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(user => {
                getUserName(user.username, 'EsterColero', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('target user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserName(123, 'Tomasturbao', error => { })
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
            getUserName('', 'Tomasturbao', error => { })
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
            getUserName('Tomasturbao', 123, error => { })
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
            getUserName('Tomasturbao', '', error => { })
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
            getUserName('Tomasturbao', 'Tomasturbao', 123)
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