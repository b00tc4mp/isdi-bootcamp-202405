import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import { errors } from 'com'

const { ValidationError, DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser('Ester', 'Colero', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123')
            .then(() => User.findOne({ email: 'ester@colero.com' }).lean())
            .then(user => {
                expect(user.name).to.equal('Ester')
                expect(user.surname).to.equal('Colero')
                expect(user.phone).to.equal('630671552')
                expect(user.address).to.equal('calle Goteta 40, Albacete')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '630671552', address: 'calle Goteta 40, Albacete', password: '123123123' })
            .then(() => registerUser('Ester', 'Colero', 'ester@colero.com', '6306715522', 'calle Goteta 40, Albacete', '123123123', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('email already exists')
            })
    })

    it('fails on existing user with same phone', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '630671552', address: 'calle Goteta 40, Albacete', password: '123123123' })
            .then(() => registerUser('Ester', 'Colero', 'peta@zeta.com', '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('phone already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser(123, 'Colero', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123')
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
            registerUser('', 'Colero', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non-string surname', () => {
        let error

        try {
            registerUser('Ester', 123, 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123')
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
            registerUser('Ester', '', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123')
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
            registerUser('Ester', 'Colero', 123, '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123')
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
            registerUser('Ester', 'Colero', '', '630671552', 'calle Goteta 40, Albacete', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non-string phone', () => {
        let error

        try {
            registerUser('Ester', 'Colero', 'ester@colero.com', 123, 'calle Goteta 40, Albacete', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('phone is not a string')
        }
    })

    it('fails on invalid phone', () => {
        let error

        try {
            registerUser('Ester', 'Colero', 'ester@colero.com', 'ewrt', 'calle Goteta 40, Albacete', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid phone')
        }
    })

    it('fails on non-string address', () => {
        let error

        try {
            registerUser('Ester', 'Colero', 'ester@colero.com', '630671552', 123, '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('address is not a string')
        }
    })

    it('fails on invalid address', () => {
        let error

        try {
            registerUser('Ester', 'Colero', 'ester@colero.com', '630671552', '', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid address')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            registerUser('Ester', 'Colero', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', 123123123, '123123123')
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
            registerUser('Ester', 'Colero', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123', '123123123')
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
            registerUser('Ester', 'Colero', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123 123', '123123123')
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
            registerUser('Ester', 'Colero', 'ester@colero.com', '630671552', 'calle Goteta 40, Albacete', '123123123', '_123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})