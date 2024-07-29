import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('updateAvatar', () => {
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
                updateAvatar(user.username, 'http://text', error => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    User.findOne({ username: 'monoloco' }).lean()
                        .then(user => {
                            expect(user.username).to.equal('monoloco')
                            expect(user.avatar).to.equal('http://text')

                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        updateAvatar('monoloco', 'http://text', error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')

            done()
        })
    })

    it('fails on non-string username', () => {
        let error

        try {
            updateAvatar(123, 'http://text', error => { })
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
            updateAvatar('', 'http://', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid username')
        }
    })

    it('fails on non-string avatar', () => {
        let error

        try {
            updateAvatar('monoloco', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid avatar', () => {
        let error

        try {
            updateAvatar('monoloco', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid avatar')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            updateAvatar('monoloco', 'http://text', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
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
