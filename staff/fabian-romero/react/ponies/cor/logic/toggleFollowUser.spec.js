import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { ValidationError, DuplicityError } = errors

describe('toggleFollowUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and targetUser has no following-back', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123', following: ['cabraloca'] })
            .then(user => {
                User.create({ name: 'Cabra', surname: 'Loca', email: 'cabra@loca.com', username: 'cabraloca', password: '123123123', following: ['monoloco'] })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'monoloco' }).lean()
                                .then(user => {
                                    expect(user.following).to.not.include(['cabraloca'])

                                    done()
                                })
                                .catch(error => done(error))

                        })
                            .catch(error => done(error))
                    })
            })
    })

    it('succeeds on existing user and targetUser has following-back', done => {
        User.create({ name: 'Mono', surname: 'Pajillero', email: 'mono@loco.com', username: 'monoloco', password: '123123123', following: ['cabraloca'] })
            .then(user => {
                User.create({ name: 'Cabra', surname: 'Loca', email: 'cabra@loca.com', username: 'cabraloca', password: '123123123', following: ['monoloco'] })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'cabraloca' }).lean()
                                .then(user => {
                                    expect(user.following).to.include('monoloco')

                                    done()
                                })
                                .catch(error => done(error))

                        })
                            .catch(error => done(error))
                    })
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleFollowUser(123, 'cabraloca', error => { })
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
            toggleFollowUser(' ', 'cabraloca', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            toggleFollowUser('monoloco', 'cabraloca', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
        }
    })



    afterEach(done => {
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})