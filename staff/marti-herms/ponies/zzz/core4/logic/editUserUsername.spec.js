import 'dotenv/config'
import editUserUsername from './editUserUsername.js'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { DuplicityError, NotFoundError, CredentialsError, ValidationError } = errors

describe('editUserUsername', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and username changed', () => {
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: hash }))
            .then(user => {
                return editUserUsername('monoloco', 'eden', '123123123')
                    .then(() => User.findById(user.id))
            })
            .then(user => expect(user.username).to.equal('eden'))
    })

    it('fails on username already in use', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' }))
            .then(_user => editUserUsername('monoloco', 'eden', '123123123'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('username already in use')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return editUserUsername('monoloco', 'eden', '123123123')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on password being wrong', () => {
        let _error

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: hash }))
            .then(() => editUserUsername('monoloco', 'eden', '11111111'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(CredentialsError)
                expect(_error.message).to.equal('wrong password')
            })
    })

    it('fails on non-string oldUsername', () => {
        let error

        try {
            editUserUsername(123, 'eden', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('oldUsername is not a string')
        }
    })

    it('fails on invalid oldUsername', () => {
        let error

        try {
            editUserUsername('', 'eden', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid oldUsername')
        }
    })

    it('fails on non-string newUsername', () => {
        let error

        try {
            editUserUsername('monoloco', 123, '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newUsername is not a string')
        }
    })

    it('fails on invalid newUsername', () => {
        let error

        try {
            editUserUsername('monoloco', '', '123123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid newUsername')
        }
    })

    it('fails on non-string password', () => {
        let error

        try {
            editUserUsername('monoloco', 'eden', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is not a string')
        }
    })

    it('fails on short password', () => {
        let error

        try {
            editUserUsername('monoloco', 'eden', '123123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password is shorter tan 8 characters')
        }
    })

    it('fails on password with spaces', () => {
        let error

        try {
            editUserUsername('monoloco', 'eden', '12312 3123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('password has empty spaces')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})