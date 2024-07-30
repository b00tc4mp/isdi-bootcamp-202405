import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import getUserName from './getUserName.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError, DuplicityError } = errors

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

    it('succeeds on existing user and target user', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user => {
                getUserName('samuspine', 'samuspine', error => {
                    expect(user.name).to.equal('Samu')

                    done()
                })
            })
            .catch(error => done(error));
    })

    it('succeeds on existing target user', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => {
                getUserName('samuspine', 'lilideponte', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('target user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user ', done => {
        getUserName('samuspine', 'lilideponte', error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')

            done()
        })
    })

    it('fails on non-existing target user', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then((user) => {
                getUserName(user.username, 'lilideponte', error => {
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
            getUserName(123, 'lilideponte', error => { })
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
            getUserName('', 'lilideponte', error => { })
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
            getUserName('samuspine', 123, error => { })
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
            getUserName('samuspine', '', error => { })
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
            getUserName('samuspine', 'lilideponte', 123)
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
