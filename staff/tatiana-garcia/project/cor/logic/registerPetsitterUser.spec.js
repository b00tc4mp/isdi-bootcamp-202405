import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import registerPetsitterUser from './registerPetsitterUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { DuplicityError, ValidationError, NotFoundError } = errors

describe('registerPetsitterUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on new petsitter', () =>
        registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
            .then(() => User.findOne({ email: 'info@vetpoint.com' }).lean())
            .then(user => {
                expect(user.image).to.equal('https://hospitalveterinariodonostia.com/')
                expect(user.name).to.equal('Vetpoint')
                expect(user.city).to.equal('Barcelona')
                expect(user.description).to.equal('Por favor, funciona de una santa vez')
                expect(user.email).to.equal('info@vetpoint.com')
                expect(user.linkPage).to.equal('https://www.vetpointclinicaveterinaria.com/es/homepage/')
                expect(user.contactEmail).to.equal('vetpoint@gmail.com')
                expect(user.phoneNumber).to.equal('655454545')
                expect(user.role).to.equal('petsitter')
                expect(user.pets).to.deep.equal(['conejos'])

                return bcrypt.compare('123123123', user.password)
                    .then(match => expect(match).to.be.true)
            })
    )

    it('fails on existing petsitter with same email', () => {
        let _error

        return User.create({ image: 'https://hospitalveterinariodonostia.com/', name: 'Vetpoint', city: 'Barcelona', description: 'Por favor, funciona de una santa vez', email: 'info@vetpoint.com', linkPage: 'https://www.vetpointclinicaveterinaria.com/es/homepage/', contactEmail: 'vetpoint@gmail.com', phoneNumber: '655454545', password: '123123123', passwordRepeat: '123123123', pets: ['conejos'] })
            .then(() => registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos']))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('email already exists')
            })
    })

    it('fails on non string name', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 123, 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', '', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 123, 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', '', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', 123, '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '1231 23123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123222', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', '', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser(123, 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 123, 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', '', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', [])
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', 123)
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
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'https://www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', 655454545, '123123123', '123123123', ['conejos'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('phoneNumber is not a string')
        }
    })

    it('fails on invalid url non startWith http', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 'www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('linkPage no es una URL válida')
        }
    })

    it('fails on linkPage is non string', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 'info@vetpoint.com', 123, 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('linkPage is not a string')
        }
    })

    it('fails on contactEmail is non string', () => {
        let error

        try {
            registerPetsitterUser('https://hospitalveterinariodonostia.com/', 'Vetpoint', 'Barcelona', 'Por favor, funciona de una santa vez', 123, 'www.vetpointclinicaveterinaria.com/es/homepage/', 'vetpoint@gmail.com', '655454545', '123123123', '123123123', ['conejos'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('email is not a string')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})