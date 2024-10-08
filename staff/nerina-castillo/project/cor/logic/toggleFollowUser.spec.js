import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import errors from '../../com/errors.js'
import toggleFollowUser from './toggleFollowUser.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('toggleFollowUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on user with existing following list', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123', following: [new ObjectId()] })
            .then(user =>
                User.create({ name: 'barrenfields', username: 'barrenfields.band', role: 'band', email: 'barren@fields.com', password: 'barrenfields1' })
                    .then(targetUser =>
                        toggleFollowUser(user.id, targetUser.id)
                            .then(() => User.findOne({ _id: user._id }).lean())
                            .then(updatedUser => {
                                expect(updatedUser.following.map(userObjectId => userObjectId.toString())).to.include(targetUser.id)
                            })
                    )
            )
    })

    it('fails on follow a non-existing user', () => {
        let error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                toggleFollowUser(user.id, new ObjectId().toString())
                    .catch(err => {
                        error = err
                    })
            )
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('targetUser not found')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: ' user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => toggleFollowUser(new ObjectId().toString(), user.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: ' user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => toggleFollowUser(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceof(NotFoundError)
                expect(_error.message).to.equal('targetUser not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleFollowUser(123, new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string targetUserId', () => {
        let error

        try {
            toggleFollowUser(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})


