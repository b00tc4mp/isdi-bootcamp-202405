import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose from 'mongoose'

import { errors } from 'com'

import { expect } from 'chai'
import { User } from '../data/models.js'

const { NotFoundError, ValidationError } = errors

describe('toggleFollowUser', () => {
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

    it('succeeds on existing user and targetUser with no following', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(user => {
                User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', username: 'Estercolero', password: '123123123' })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'Tomasturbao' }).lean()
                                .then(user => {
                                    expect(user.following).to.include('Estercolero')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and targetUser with following', done => {
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', username: 'Estercolero', password: '123123123' })
            .then(() => {
                User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123', following: ['Estercolero'] })
                    .then(() => {
                        toggleFollowUser('Tomasturbao', 'Estercolero', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'Tomasturbao' }).lean()
                                .then(user => {
                                    expect(user.following).to.not.include({ username: 'Estercolero' })

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', username: 'Estercolero', password: '123123123' })
            .then(user => {
                toggleFollowUser('Tomasturbao', user.username, error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing targetUser', done => {
        User.create({ name: 'Tomas', surname: 'Turbao', email: 'tomas@turbao.com', username: 'Tomasturbao', password: '123123123' })
            .then(() => {
                toggleFollowUser('Tomasturbao', 'Estercolero', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('targetUser not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleFollowUser(123, 'Estercolero', error => { })
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
            toggleFollowUser('', 'Estercolero', error => { })
            NotFoundError
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
            toggleFollowUser('Tomasturbao', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUsername is not a string')
        }
    })

    it('fails on invalid targetUsername', () => {
        let error

        try {
            toggleFollowUser('Tomasturbao', '', error => { })
            NotFoundError
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
            toggleFollowUser('Tomasturbao', 'Estercolero', 123)
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