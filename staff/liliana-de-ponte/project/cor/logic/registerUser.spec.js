import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on new user', () =>
        registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456789', '123456789')
            .then(() => User.findOne({ username: 'samuelespinetti' }).lean())
            .then(user => {
                expect(user.name).to.equal('Samuele')
                expect(user.surname).to.equal('Spinetti')
                expect(user.email).to.equal('samuele@spinetti.com')
                expect(user.username).to.equal('samuelespinetti')

                return bcrypt.compare('123456789', user.password)
                    .then(match => expect(match).to.be.true)
            })
    )

    it('fails on exiting user with same email', () => {
        let _error

        return User.create({ name: 'Samuele', surname: 'Spinetti', email: 'samuele@spinetti.com', username: 'samuelespinetti', password: '123456789' })
            .then(() => registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456789', '123456789'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ name: 'Samuele', surname: 'Spinetti', email: 'samuele@spinetti.com', username: 'samuelespinetti', password: '123456789' })
            .then(() => registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456789', '123456789'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerUser('', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non string surname', () => {
        let error

        try {
            registerUser('Samuele', 123, 'samuele@spinetti.com', 'samuelespinetti', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('surname is not a string')
        }
    })

    it('fails on invalid surname', () => {
        let error

        try {
            registerUser('Samuele', '', 'samuele@spinetti.com', 'samuelespinetti', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid surname')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerUser('Samuele', 'Spinetti', 123, 'samuelespinetti', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('email is not a string')
        }
    })

    it('fails on invalid email', () => {
        let error

        try {
            registerUser('Samuele', 'Spinetti', '', 'samuelespinetti', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 123, '123456789', '123456789')
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
            registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', '', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', 123456789, '123456789')
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
            registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456', '123456789')
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
            registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456 789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-matching passwords', () => {
        let error

        try {
            registerUser('Samuele', 'Spinetti', 'samuele@spinetti.com', 'samuelespinetti', '123456789', '_123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
