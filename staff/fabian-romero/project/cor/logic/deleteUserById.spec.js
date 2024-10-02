import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import deleteUserById from './deleteUserById.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError } = errors

describe('deleteUserById', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on deleting an existing user', () => {
        let userId

        return User.create({ name: 'mari', surname: 'trueno', email: 'mari@trueno.com', username: 'maritrueno', password: 'hashedpassword' })
            .then(user => {
                userId = user._id.toString()
                return deleteUserById(userId)
            })
            .then(() => User.findById(userId))
            .then(user => {
                expect(user).to.be.null
            })
    })

    it('fails on deleting a non-existing user', () => {
        let _error

        return deleteUserById('60c72b2f9b1e8f001c8d4c1e')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            deleteUserById(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
