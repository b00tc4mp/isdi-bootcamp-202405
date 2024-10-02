import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import updatePassword from './updatePassword.js'
import errors from '../../com/errors.js'
const { NotFoundError, CredentialsError, ValidationError } = errors

describe('updatePassword', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        debugger
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: hash }))
            .then(user => updatePassword(user.id, '123123123', '123456789', '123456789')
                .then(() => User.findOne({ username: 'rosafit' }).lean()
                    .then(user => {
                        expect(user.username).to.equal('rosafit')

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

    it('fails on non matching passwords', () => {
        let _error

        return User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user => updatePassword(user.id, '123123123', '123456789', '123456789'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })
    })

    it('fails on non matching new passwords', () => {
        let _error

        return User.create({ name: 'Rosaj', surname: 'Fit', email: 'rosa@fit.com', username: 'monoloco', password: '123123123' })
            .then(user => updatePassword(user.id, '123123123', '123456789', '123456780'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('password do not match')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updatePassword(123, '123123123', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on invalid userId', () => {
        let error

        try {
            updatePassword('', '123123123', '123456789', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string oldPassword', () => {
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

    it('fails on oldPassword too short', () => {
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

    it('fails on oldPassword with spaces', () => {
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

    it('fails on non-string newPassword', () => {
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

    it('fails on newPassword too short', () => {
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

    it('fails on newPassword with spaces', () => {
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

    it('fails on non-string newPasswordRepeat', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', '123456789', 123456789)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on newPasswordRepeat too short', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', '123456789', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password length is lower than 8 characters')
        }
    })

    it('fails on newPasswordRepeat with spaces', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', '123456789', '123456 789')
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