import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerPetsitterUser from './registerPetsitterUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { DuplicityError, ValidationError } = errors

describe('registerPetsitterUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new petsitter', () =>
        registerPetsitterUser('https://hospitalveterinariodonostia.com/wp-content/uploads/2018/12/6-lugares-donde-puedes-ver-animales-exoticos-6.jpg', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
            .then(() => User.findOne({ email: 'tati@garcia.com' }).lean())
            .then(user => {
                expect(user.image).to.equal('https://hospitalveterinariodonostia.com/wp-content/uploads/2018/12/6-lugares-donde-puedes-ver-animales-exoticos-6.jpg')
                expect(user.name).to.equal('Tatiana')
                expect(user.city).to.equal('Barcelona')
                expect(user.description).to.equal('Por favor, funciona de una santa vez')
                expect(user.email).to.equal('tati@garcia.com')
                expect(user.phoneNumber).to.equal('655454545')
                expect(user.pets).to.deep.equal(['conejos', 'cobayas'])

                return bcrypt.compare('123123123', user.password)
                    .then(match => expect(match).to.be.true)
            })
    )

    it('fails on existing petsitter with same email', () => {
        let _error

        return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Tatiana', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'tati@garcia.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', role: 'petsitter', pets: ['conejos', 'cobayas'] })
            .then(() => registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas']))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('email already exists')
            })
    })

    it('fails on non string name', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 123, 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', '', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid name')
        }
    })

    it('fails on non string email', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 123, '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', '', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', 123, '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on password is too short', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on password have spaces', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '1231 23123', '123123123', ['conejos', 'cobayas'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123222', ['conejos', 'cobayas'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', '', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('the field can not be empty')
        }
    })

    it('fails on non string image', () => {
        let error

        try {
            registerPetsitterUser(123, 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid url non startWith http', () => {
        let error

        try {
            registerPetsitterUser('hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    it('fails on non string description', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 123, 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('description is not a string')
        }
    })

    it('fails on description is empty', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', '', 'tati@garcia.com', '655454545', '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('the description must have more than 1 characters')
        }

    })

    it('fails on non selected any pets', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', [])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('at least one pet must be selected')
        }
    })

    it('fails on non array pets', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '655454545', '123123123', '123123123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('pets is not an array')
        }
    })

    it('fails on non string phoneNumber', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', 655454545, '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('phoneNumber is not a string')
        }
    })

    it('fails on phoneNumber have spaces', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Tatiana', 'Barcelona', 'Por favor, funciona de una santa vez', 'tati@garcia.com', '6554  54545', '123123123', '123123123', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('phoneNumber has empty spaces')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})