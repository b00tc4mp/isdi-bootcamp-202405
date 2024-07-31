import 'dotenv/config'
import toggleUserFollow from './toggleUserFollow.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, OutOfBoundsError, ValidationError, CorruptedInfoError } = errors

describe('toggleUserFollow', () => {
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

    it('succeeds on existing users and and user1 is not following user2', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
                    .then(_user => {
                        toggleUserFollow('monoloco', 'eden', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'monoloco' })
                                .then(user => {
                                    expect(user.following).to.include(_user._id)

                                    User.findOne({ username: 'eden' })
                                        .then(_user => {
                                            expect(_user.followers).to.include(user._id)

                                            done()
                                        })
                                        .catch(error => done(error))
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing users and and user1 is following user2', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123', followers: [user._id] })
                    .then(_user => {
                        User.updateOne({ username: user.username }, { $set: { following: [_user._id] } })
                            .then(() => {
                                toggleUserFollow('monoloco', 'eden', error => {
                                    if (error) {
                                        console.error(error)

                                        return
                                    }

                                    User.findOne({ username: 'monoloco' })
                                        .then(user => {
                                            expect(user.following).to.not.include(_user._id)

                                            User.findOne({ username: 'eden' })
                                                .then(_user => {
                                                    expect(_user.followers).to.not.include(user._id)

                                                    done()
                                                })
                                                .catch(error => done(error))
                                        })
                                        .catch(error => done(error))
                                })
                            })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
            .then(post => {
                toggleUserFollow('monoloco', 'eden', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on user being targetUser', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                toggleUserFollow('monoloco', 'monoloco', error => {
                    expect(error).to.be.instanceOf(OutOfBoundsError)
                    expect(error.message).to.equal('tried following yourself')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing targetUser', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                toggleUserFollow('monoloco', 'eden', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('targetUser not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on user1 following user2 but user 2 is not being followed by user1', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123', followers: [user._id] })
                    .then(_user => {
                        toggleUserFollow('monoloco', 'eden', error => {
                            expect(error).to.be.instanceOf(CorruptedInfoError)
                            expect(error.message).to.equal('wrong saved information')

                            done()
                        })
                    })
                    .catch(error => done(error))

            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleUserFollow(123, 'eden', error => { })
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
            toggleUserFollow('', 'eden', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string targetUser', () => {
        let error

        try {
            toggleUserFollow('monoloco', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUsername is not a string')
        }
    })

    it('fails on invalid targetUser', () => {
        let error

        try {
            toggleUserFollow('monoloco', '', error => { })
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
            toggleUserFollow('monoloco', 'eden', 123)
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