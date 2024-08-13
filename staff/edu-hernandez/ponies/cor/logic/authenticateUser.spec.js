import 'dotenv/config.js'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'
import { expect, assert, Assertion } from 'chai'
import { User } from '../data/models.js'
import { errors } from 'com'

const { ValidationError } = errors

describe('authenticateUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(() => User.deleteMany())

    it('succeeds on username and password is correct', () =>
        bcrypt.hash('123123123', 8)
            .the(hash => User.create({
                name: 'Roger',
                surname: 'Federer',
                email: 'roger@federer.com',
                username: 'rfederer',
                passowrd: '123123123'
            })))

})

it('fails on non-string username', () => {
    let error

    try {
        authenticateUser(12, '123123123', error => { })
    } catch (_error) {
        error = _error
    } finally {
        expect(error).to.be.instanceOf(ValidationError)
        expect(error.message).to.equal('username is not a string')
    }
})

it('fails on non-existing user', done => {
    authenticateUser('rfederer', '123123123', error => {
        expect(error).to.be.instanceOf(ValidationError)
        expect(error.message).to.equal('user not found')

    })

    done()
})

it('fails on invalid username', () => {
    let error

    try {
        authenticateUser('rf', '123123123', error => { })
    } catch (_error) {
        error = _error
    } finally {
        expect(error).to.be.instanceOf(ValidationError)
        expect(error.message).to.equal('invalid username')
    }
})

it('fails on wrong password', done => {
    User.create({
        name: 'Roger',
        surname: 'Federer',
        email: 'roger@federer.com',
        username: 'rfederer',
        password: '123123123'
    })
        .then(() => {
            authenticateUser('rfederer', '123123132', error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('wrong password')

                done()
            })
        })
        .catch(error => done(error))
})

it('fails on non-string password', () => {
    let error

    try {
        authenticateUser('rfederer', 123123123, error => { })
    } catch (_error) {
        error = _error
    } finally {
        expect(error).to.be.instanceOf(ValidationError)
        expect(error.message).to.equal('password is not a string')
    }
})

it('fails on password short', () => {
    let error

    try {
        authenticateUser('rfederer', '123123', error => { })
    } catch (_error) {
        error = _error
    } finally {
        expect(error).to.be.instanceOf(ValidationError)
        expect(error.message).to.equal('password length is lower than 8 characters')
    }
})

it('fails on password with spaces', () => {
    let error

    try {
        authenticateUser('rfederer', '123123 123', error => { })
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
        authenticateUser('rfederer', '123123123', 123)
    } catch (_error) {
        error = _error
    } finally {
        expect(error).to.be.instanceOf(ValidationError)
        expect(error.message).to.equal('callback is not a function')
    }
})

afterEach(() => Promise.all([User.deleteMany()]))

after(() => mongoose.disconnect())