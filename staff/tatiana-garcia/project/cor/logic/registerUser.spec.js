import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { DuplicityError, ValidationError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new User', () =>
        registerUser('https://www.ngenespanol.com/wp-content/uploads/2024/03/estos-son-los-animales-que-no-deberias-tener-como-mascotas.jpg', 'Tatiana', 'Garcia', 'tati@garcia.com', '123123123', '123123123')
            .then(() => User.findOne({ email: 'tati@garcia.com' }).lean())
            .then(user => {
                expect(user.image).to.equal('https://www.ngenespanol.com/wp-content/uploads/2024/03/estos-son-los-animales-que-no-deberias-tener-como-mascotas.jpg')
                expect(user.name).to.equal('Tatiana')
                expect(user.surname).to.equal('Garcia')
                expect(user.email).to.equal('tati@garcia.com')
                expect(user.role).to.equal('regular')

                return bcrypt.compare('123123123', user.password)
                    .then(match => expect(match).to.be.true)
            })
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123', role: 'regular' })
            .then(() => registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', '123123123', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('email already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 123, 'Garcia', 'tati@garcia.com', '123123123', '123123123')
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
            registerUser('https://www.ngenespanol.com/', '', 'Garcia', 'tati@garcia.com', '123123123', '123123123')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 123, 'tati@garcia.com', '123123123', '123123123')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', '', 'tati@garcia.com', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid surname')
        }
    })

    it('fails on non string email', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 123, '123123123', '123123123')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', '', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non string password', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 123123123, '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on non password short', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', '1231', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on non password have spaces', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', '123123 123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non matching passwords', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', '123456123', '123123123')
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