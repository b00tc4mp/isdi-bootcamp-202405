import 'dotenv/config'
import updatePassword from './updatePassword.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, CredentialsError, ValidationError } = errors

describe('updatePassword', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => updatePassword(user.id, '123123123', '123456789')
                .then(() => User.findOne({ username: 'monoloco' }).lean()
                    .then(user => {
                        expect(user.username).to.equal('monoloco')

                        bcrypt.compare('123123123', user.password)
                            .then(match => expect(match).to.be.true)
                    })
                )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return updatePassword(new ObjectId().toString(), '123123123', '123456789')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non matching passwords', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => updatePassword(user.id, '123123124', '123456789'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('Wrong password')
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
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    it('fails on non-string oldpassword', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), 123123123, '123456789')
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
            updatePassword(new ObjectId().toString(), '123123', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Password length is lower than 8 character')
        }
    })

    it('fails on oldpassword with spaces', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123 123', '123456789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Password has empty spaces')
        }
    })

    it('fails on non-string newpassword', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', 123456789)
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
            updatePassword(new ObjectId().toString(), '123123123', '1234')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Password length is lower than 8 character')
        }
    })

    it('fails on newpassword with spaces', () => {
        let error

        try {
            updatePassword(new ObjectId().toString(), '123123123', '1234 56789')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Password has empty spaces')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
