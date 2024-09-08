import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'

const { DuplicityError, CredentialsError, ValidationError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds when email and password are correct, transforming _id to id and returning role', () => {
        const email = 'tati@garcia.com'
        const password = '123123123'

        return bcrypt.hash(password, 8)
            .then(hash => {
                return User.create({
                    image: 'https://www.ngenespanol.com/',
                    name: 'Tatiana',
                    surname: 'Garcia',
                    email,
                    password: hash,
                    role: 'regular'
                })
            })
            .then(user => {
                return authenticateUser(email, password)
                    .then(result => {
                        expect(result).to.be.an('object')
                        expect(result).to.have.property('id')
                        expect(result).to.have.property('role')
                        expect(result.id).to.equal(user._id.toString())
                        expect(result.role).to.equal('regular')
                    })
            })
    })

    it('fails on existing user with same email', () => {
        let _error

        bcrypt.hash('123123123', 8)
            .then(hash => {
                User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: hash })
                    .then(() => authenticateUser('tati@garcia.com', '123123123'))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(DuplicityError)
                        expect(_error.message).to.equal('email already exists')
                    })
            })
    })

    it('fails on non existing user', () => {
        let _error

        authenticateUser('abtg@gmail.com', '123123123')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on wrong password', () => {
        let error

        bcrypt.hash('123123123', 8)
            .then(hash =>
                User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: hash })
            )
            .then(() => authenticateUser('tati@garcia.com', '111111111'))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
            })
    })

    it('fails on wrong email', () => {
        let error

        bcrypt.hash('123123123', 8)
            .then(hash =>
                User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: hash })
            )
            .then(() => authenticateUser('pepe@garcia.com', '123123123'))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong email')
            })
    })

    it('fails on non string email', () => {
        let error

        try {
            authenticateUser(123, '123123123')
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
            authenticateUser('', '123123123')
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
            authenticateUser('tati@garcia.com', 123123123)
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
            authenticateUser('tati@garcia.com', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on password do not match', () => {
        let _error

        bcrypt.hash('123123123', 8)
            .then(hash =>
                User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', password: hash })
            )
            .then(user => authenticateUser(user.email, '147895235'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })
    })

    it('fails on password with spaces', () => {
        let error

        try {
            authenticateUser('tati@garcia.com', '123123 123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})