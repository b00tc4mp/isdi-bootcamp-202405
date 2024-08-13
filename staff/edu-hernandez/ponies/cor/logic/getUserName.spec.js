import 'dotenv/config'
import getUserName from "./getUserName.js"
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import { errors } from 'com'

const { ValidationError } = errors

describe('getUserName', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on existing user and targetUser', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                getUserName('rfederer', 'rfederer', error => {
                    expect(user.username).to.equal('rfederer')
                    expect(targetUser.username).to.equal('rfederer')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        getUserName('rfederer', 'novak', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
            done()
        })
    })

    it('fails on invalid username', () => {
        let error

        try {
            getUserName('rf', 'novak', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserName(23, '123123123', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on non-existing targetUser', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                getUserName(user.username, 'novak', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('target user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on invalid targetUsername', () => {
        let error

        try {
            getUserName('rfederer', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string targetUsername', () => {
        let error

        try {
            getUserName('rfederer', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on non-function callback', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                let error

                try {
                    getUserName('rfederer', 'novak', 23)
                } catch (_error) {
                    error = _error
                }

                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal('callback is not a function')
                done()
            })
            .catch(error => done(error))
    })

    afterEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})