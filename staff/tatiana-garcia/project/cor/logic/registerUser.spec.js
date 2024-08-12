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

    it('succeeds on new user', () =>
        registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user')
            .then(() => User.findOne({ username: 'tatig' }).lean())
            .then(user => {
                expect(user.image).to.equal('https://www.ngenespanol.com/')
                expect(user.name).to.equal('Tatiana')
                expect(user.surname).to.equal('Garcia')
                expect(user.email).to.equal('tati@garcia.com')
                expect(user.username).to.equal('tatig')
                expect(user.role).to.equal('user')

                return bcrypt.compare('123123123', user.password)
                    .then(match => expect(match).to.be.true)
            })
    )

    it('succeeds on new petsitterUser', () =>
        registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'petsitter', 'elsAltres', 'Barcelona', 'estoy hasta las pelotas', ['conejo, cobaya'])
            .then(() => User.findOne({ username: 'tatig' }).lean())
            .then(user => {
                expect(user.image).to.equal('https://www.ngenespanol.com/')
                expect(user.name).to.equal('Tatiana')
                expect(user.surname).to.equal('Garcia')
                expect(user.email).to.equal('tati@garcia.com')
                expect(user.username).to.equal('tatig')
                expect(user.role).to.equal('petsitter')
                expect(user.petsitterName).to.equal('elsAltres')
                expect(user.city).to.equal('Barcelona')
                expect(user.description).to.equal('estoy hasta las pelotas')
                expect(user.pets).to.deep.equal(['conejo, cobaya'])

                return bcrypt.compare('123123123', user.password)
                    .then(match => expect(match).to.be.true)
            })
    )

    it('fails on existing user with same email', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', passwordRepeat: '123123123', role: 'user' })
            .then(() => registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing user with same username', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', passwordRepeat: '123123123', role: 'user' })
            .then(() => registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on existing user with same petsitterName', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', passwordRepeat: '123123123', role: 'user', petsitterName: 'elsaltres', city: 'Barcelona', description: 'estoy hasta las pelotas', pets: ['conejo, cobaya'] })
            .then(() => registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'petsitter', 'elsAltres', 'Barcelona', 'estoy hasta las pelotas', ['conejo, cobaya']))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('user already exists')
            })
    })

    it('fails on non-string name', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 123, 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails when the number of animals is less than one', () => {
        let error
        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'petsitter', 'elsAltres', 'Barcelona', 'estoy hasta las pelotas', [''])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('At least one pet must be selected')
        }
    })

    it('fails on invalid name', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', '', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 123, 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', '', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 123, 'tatig', '123123123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', '', 'tatig', '123123123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 123, '123123123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', '', '123123123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', 123123123, '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '1231', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123 123', '123123123', 'user')
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
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123456123', '123123123', 'user')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('passwords do not match')
        }
    })

    it('fails on role non matching', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'guarderia')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid role')
        }
    })

    it('fails on non string petsitterName', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'petsitter', 123, 'Barcelona', 'estoy hasta las pelotas', ['conejo, cobaya'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('petsitterName is not a string')
        }
    })

    it('fails on the field of the city can not be ampty', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'petsitter', 'elsatres', '', 'estoy hasta las pelotas', ['conejo, cobaya'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('the field can not be empty')
        }
    })

    it('fails on non string description', () => {
        let error

        try {
            registerUser('https://www.ngenespanol.com/', 'Tatiana', 'Garcia', 'tati@garcia.com', 'tatig', '123123123', '123123123', 'petsitter', 'elsatres', 'Barcelona', ['conejo, cobaya'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('description is not a string')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})