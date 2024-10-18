import 'dotenv/config'
import updateEmail from './updateEmail.js'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'

const { NotFoundError, ValidationError, CredentialsError, DuplicityError } = errors

describe('updateEmail', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: hash }))
            .then(user => updateEmail(user.id, 'peta@zeta.com', '123123123')
                .then(() => User.findOne({ email: 'peta@zeta.com' }).lean()
                    .then(user => {
                        expect(user.email).to.equal('peta@zeta.com')
                    })
                )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return updateEmail(new ObjectId().toString(), 'peta@zeta.com', '123123123')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateEmail(123, 'peta@zeta.com', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            updateEmail(new ObjectId().toString(), 'peta@zeta.com', 123123123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails password too short', () => {
        let error

        try {
            updateEmail(new ObjectId().toString(), 'peta@zeta.com', '123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on oldpassword with spaces', () => {
        let error

        try {
            updateEmail(new ObjectId().toString(), 'peta@zeta.com', '123123 123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on wrong password', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => updateEmail(user.id, 'peta@zeta.com', '123123124'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })
    })

    it('fails on duplicated email', () => {
        return bcrypt.hash('123123123', 8)
            .then(hash => {
                // Crear el primer usuario
                return User.create({ name: 'Caca', surname: 'Tua', email: 'caca@tua.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: hash })
            })
            .then(user1 => {
                // Crear el segundo usuario
                return User.create({ name: 'Peta', surname: 'Zeta', email: 'peta@zeta.com', phone: '965432876', address: 'calle Tertulia 4, Cuenca', password: user1.password })
            })
            .then(user2 => {
                // Intentar actualizar el email de user2 al email de user1
                return updateEmail(user2.id, 'caca@tua.com', '123123123')
            })
            .catch(error => {
                // Verificar que se lanza un DuplicityError
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('email already exists')
            })
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
