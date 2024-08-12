import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getUser from './getUser.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123123123' })
                    .then(targetUser =>
                        getUser(user.id, targetUser.id)
                            .then(() => {
                                expect(targetUser.name).to.equal('Samu')
                                expect(targetUser.surname).to.equal('Spine')
                                expect(targetUser.email).to.equal('samu@spine.com')
                                expect(targetUser.username).to.equal('samuspine')
                            })
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return getUser(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUser(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('Target user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUser(123, new ObjectId().toString())
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
            getUser(new ObjectId().toString(), 123)
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