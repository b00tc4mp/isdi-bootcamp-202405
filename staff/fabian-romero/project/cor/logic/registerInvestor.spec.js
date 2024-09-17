import 'dotenv/config'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import { User } from '../data/models.js'
import { errors } from '../../com/index.js'

import registerInvestor from './registerInvestor.js'

const { ValidationError, DuplicityError } = errors

describe('registerInvestor', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany().exec())

    it('succeeds on new user', () =>
        registerInvestor('Rosa', 'Fit', 'rosa@fit.com', '987654321', 'rosafit', '123123123', '123123123', 'http://imagen.com', 'description')
            .then(() => User.findOne({ username: 'rosafit' }).lean())
            .then(user => {
                expect(user).to.not.be.null
                expect(user.name).to.equal('Rosa')
                expect(user.surname).to.equal('Fit')
                expect(user.email).to.equal('rosa@fit.com')
                expect(user.phoneNumber).to.equal('987654321')
                expect(user.username).to.equal('rosafit')
                expect(user.password).to.not.equal('123123123')
                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ name: 'Rosa', username: 'Fit', email: 'rosa@fit.com', phoneNumber: '987654321', username: 'rosafit', password: '123123123', passwordRepeat: '123123123', url: 'http://image.com', description: 'description' })
            .then(() => registerInvestor('paquito', 'choco', 'rosa@fit.com', '987654321', 'paquito', '123123123', '123123123', 'http://imagen.com', 'description2'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.be.equal('User already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ name: 'Rosa', username: 'Fit', email: 'rosa@fit.com', phoneNumber: '987654321', username: 'rosafit', password: '123123123', passwordRepeat: '123123123', url: 'http://image.com', description: 'description' })
            .then(() => registerInvestor('paquito', 'choco', 'paquito@choco.com', '987654321', 'rosafit', '123123123', '123123123', 'http://imagen.com', 'description2'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('User already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerInvestor(123, 'choco', 'rosa@fit.com', '987654321', 'paquito', '123123123', '123123123', 'http://imagen.com', 'description2')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.be.equal('name is not a string')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerInvestor('', 'choco', 'rosa@fit.com', '987654321', 'paquito', '123123123', '123123123', 'http://imagen.com', 'description2')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non-string phone number', () => {
        let error

        try {
            registerInvestor('paquito', 'choco', 'paquito@choco.com', 987654321, 'paquito', '123123123', '123123123', 'http://imagen.com', 'description2')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.be.equal('value is not a string')
        }
    })

    it('fails on invalid phone number', () => {
        let error

        try {
            registerInvestor('paquito', 'choco', 'paquito@choco.com', ' ', 'paquito', '123123123', '123123123', 'http://imagen.com', 'description2')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid phoneNumber')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            registerInvestor('paquito', 'choco', 123123, '987654321', 'paquito', '123123123', '123123123', 'http://imagen.com', 'description2')
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
            registerInvestor('paquito', 'choco', 'rosa@fit', '987654321', 'paquito', '123123123', '123123123', 'http://imagen.com', 'description2')
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
            registerInvestor('paquito', 'choco', 'rosa@fit.com', '987654321', 123123, '123123123', '123123123', 'http://imagen.com', 'description2')
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
            registerInvestor('paquito', 'choco', 'rosa@fit.com', '987654321', ' ', '123123123', '123123123', 'http://imagen.com', 'description2')
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
            registerInvestor('paquito', 'choco', 'rosa@fit.com', '987654321', 'paquito', 123123123, '123123123', 'http://imagen.com', 'description2')
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
            registerInvestor('paquito', 'choco', 'rosa@fit.com', '987654321', 'paquito', '123123', '123123', 'http://imagen.com', 'description2')
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
            registerInvestor('paquito', 'choco', 'rosa@fit.com', '987654321', 'paquito', '1231 23123', '1231 23123', 'http://imagen.com', 'description2')
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
            registerInvestor('paquito', 'choco', 'rosa@fit.com', '987654321', 'paquito', '321321321', '123123123', 'http://imagen.com', 'description2')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Passwords do not match')
        }
    })

    afterEach(() => User.deleteMany().exec())

    after(() => mongoose.disconnect())
})
