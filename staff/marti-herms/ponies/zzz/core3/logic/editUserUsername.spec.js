import 'dotenv/config'
import editUserUsername from './editUserUsername.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { DuplicityError, NotFoundError, CredentialsError, ValidationError } = errors

describe('editUserUsername', () => {
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

    it('succeeds on existing user and username changed', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                editUserUsername('monoloco', 'eden', '123123123', error => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    User.findById(user.id)
                        .then(user => {
                            expect(user.username).to.equal('eden')

                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on username already in use', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' })
                    .then(_user => {
                        editUserUsername('monoloco', 'eden', '123123123', error => {
                            expect(error).to.be.instanceOf(DuplicityError)
                            expect(error.message).to.equal('username already in use')

                            done()
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        editUserUsername('monoloco', 'eden', '123123123', error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')

            done()
        })
    })

    it('fails on password being wrong', done => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(() => {
                editUserUsername('monoloco', 'eden', '11111111', error => {
                    expect(error).to.be.instanceOf(CredentialsError)
                    expect(error.message).to.equal('wrong password')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string oldUsername', () => {
        let error

        try {
            editUserUsername(123, 'eden', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('oldUsername is not a string')
        }
    })

    it('fails on invalid oldUsername', () => {
        let error

        try {
            editUserUsername('', 'eden', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid oldUsername')
        }
    })

    it('fails on non-string newUsername', () => {
        let error

        try {
            editUserUsername('monoloco', 123, '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newUsername is not a string')
        }
    })

    it('fails on invalid newUsername', () => {
        let error

        try {
            editUserUsername('monoloco', '', '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid newUsername')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            editUserUsername('monoloco', 'eden', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on short password', () => {
        let error

        try {
            editUserUsername('monoloco', 'eden', '123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is shorter tan 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            editUserUsername('monoloco', 'eden', '12312 3123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            editUserUsername('monoloco', 'eden', '123123123', 213)
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