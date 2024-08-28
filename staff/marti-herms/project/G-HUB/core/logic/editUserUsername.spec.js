import 'dotenv/config'
import editUserUsername from './editUserUsername.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import { errors } from 'com'

const { DuplicityError, NotFoundError, CredentialsError, ValidationError } = errors

describe('editUserUsername', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and username changed', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                return editUserUsername(user.id, 'eden')
                    .then(() => User.findById(user.id))
            })
            .then(user => expect(user.username).to.equal('eden'))
    })

    it('fails on username already in use', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => User.create({ name: 'Marti', surname: 'Herms', email: 'marti@herms.com', username: 'eden', password: '123123123' }))
            .then(_user => editUserUsername(_user.id, 'monoloco'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(DuplicityError)
                expect(_error.message).to.equal('username already in use')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return editUserUsername('66ba007f874aa7b84ec54491', 'eden')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            editUserUsername(123, 'eden')
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
            editUserUsername('123', 'eden')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string newUsername', () => {
        let error

        try {
            editUserUsername('66ba007f874aa7b84ec54491', 123)
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
            editUserUsername('66ba007f874aa7b84ec54491', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid newUsername')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})