import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

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
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'monoloco' }).lean()
                                .then(user => {
                                    expect(user.following).to.include('samuspine')

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
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(() => {
                User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123', following: ['samuspine'] })
                    .then(() => {
                        toggleFollowUser('monoloco', 'samuspine', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'monoloco' }).lean()
                                .then(user => {
                                    expect(user.following).to.not.include({ username: 'samuspine' })

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
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
            .then(user => {
                toggleFollowUser('monoloco', user.username, error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('User not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user but non-existing targetUser', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                toggleFollowUser('monoloco', 'samuspine', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('TargetUser not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleFollowUser(123, 'samuspine', error => { })
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
            toggleFollowUser('', 'samuspine', error => { })
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
            toggleFollowUser('monoloco', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid targetUsername', () => {
        let error

        try {
            toggleFollowUser('monoloco', '', error => { })
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
            toggleFollowUser('monoloco', 'samuspine', 123)
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