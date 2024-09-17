import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User } from '../data/models.js'
import errors from '../../com/errors.js'
import getUserName from './getUserName.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getUserName', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and target user', () => {
        return User.create({ name: 'Rosa', username: 'Fit', email: 'rosa@fit.com', password: 'rosafit', role: 'project' })
            .then(user => {
                return getUserName(user.id, user.id)
                    .then(name => {
                        expect(name).to.equal('Rosa')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUserName(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'Rouse', username: 'Fitess', email: 'rosa@fit.com', password: 'rosafit', role: 'project' })
            .then(user => getUserName(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('Target user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUserName(123, new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    it('fails on non-string targetUserId', () => {
        let error

        try {
            getUserName(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('TargetUserId is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})