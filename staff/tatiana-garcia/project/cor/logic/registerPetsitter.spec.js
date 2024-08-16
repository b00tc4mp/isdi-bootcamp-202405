import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerPetsitter from './registerPetsitter.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { DuplicityError, ValidationError } = errors

describe('registerPetsitter', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new petsitter', () =>
        registerPetsitter('https://www.ngenespanol.com/wp-content/uploads/2024/03/estos-son-los-animales-que-no-deberias-tener-como-mascotas.jpg', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tat@garcia.com', '123123123', '123123123')
            .then(() => User.findOne({ username: 'tatig' }).lean())
            .then(user => {
                expect(user.image).to.equal('https://www.ngenespanol.com/wp-content/uploads/2024/03/estos-son-los-animales-que-no-deberias-tener-como-mascotas.jpg')
                expect(user.name).to.equal('Tatiana')
                expect(user.surname).to.equal('Garcia')
                expect(user.username).to.equal('tatig')
                expect(user.cif).to.equal('B12345678')
                expect(user.city).to.equal('Barcelona')
                expect(user.email).to.equal('tat@garcia.com')

                return bcrypt.compare('123123123', user.password)
                    .then(match => expect(match).to.be.true)
            })
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', username: 'tatig', cif: 'B12345678', city: 'Barcelona', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123' })
            .then(() => registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123123123', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', username: 'tatig', cif: 'B12345678', city: 'Barcelona', email: 'tati@garcia.com', password: '123123123', passwordRepeat: '123123123' })
            .then(() => registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123123123', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerPetsitter('https://www.ngenespanol.com/', 123, 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123123123', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', '', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123123123', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 123, 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123123123', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', '', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123123123', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 123, '123123123', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', '', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid email')
        }
    })

    it('fails on non string username', () => {
        let error

        try {
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 123, 'B12345678', 'Barcelona', 'tati@garcia.com', '123123123', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', '', 'B12345678', 'Barcelona', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non string password', () => {
        let error

        try {
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', 123123123, '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '1231', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123123 123', '123123123')
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
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', 'Barcelona', 'tati@garcia.com', '123456123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    it('fails on the field of the city can not be ampty', () => {
        let error

        try {
            registerPetsitter('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tatig', 'B12345678', '', 'tati@garcia.com', '123123123', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('the field can not be empty')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})