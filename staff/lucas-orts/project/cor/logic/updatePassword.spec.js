import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, CredentialsError, ValidationError } = errors

describe('updatePassword', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: hash }))
            .then(user => updatePassword(user.id, '123123123', '123456789', '123456789')
                .then(() => User.findOne({ email: 'ester@colero' }).lean()
                    .then(user => {
                        expect(user.email).to.equal('ester@colero')

                        return bcrypt.compare('123456789', user.password)
                    })
                    .then(match => expect(match).to.be.true)
                )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return updatePassword(new ObjectId().toString(), '123123123', '123456789', '123456789')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on wrong password', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => updatePassword(user.id, '123123124', '123456789', '123456789'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updatePassword(123, '123123123', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string oldpassword', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), 123123123, '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on oldpassword too short', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123', '123456789', '123456789')
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
            updatePassword(new ObjectId().toString(), '123123 123', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    it('fails on non-string newpassword', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', 123456789, '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on newpassword too short', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', '1234', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on newpassword with spaces', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', '1234 56789', '123456789')
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
            updatePassword(new ObjectId().toString(), '123123123', '123456789', '1234567890')
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
