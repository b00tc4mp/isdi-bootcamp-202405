import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User } from '../data/models.js'
import { errors } from '../../com/index.js'
import toggleLikeUser from './toggleLikeUser.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('toggleLikeUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany()]))

    it('succeeds on existing user and target user with no likes', () =>
        User.create({ name: 'rosa', username: 'fit', email: 'rosa@fit.com', password: '123123123' })
            .then(user =>
                User.create({ name: 'paquito', username: 'chocolatero', email: 'paquito@choco.com', password: '123123123' })
                    .then(targetUser =>
                        toggleLikeUser(user.id, targetUser.id)
                            .then(() => User.findById(user.id).lean())
                            .then(user => expect(user.likes.map(userObjectId => userObjectId.toString())).to.include(targetUser.id))
                    )
            )
    )
    it('succeeds on existing user and target user with likes', () =>
        User.create({ name: 'rosa', username: 'fit', email: 'rosa@fit.com', password: '123123123', likes: [] })
            .then(user =>
                User.create({ name: 'paquito', username: 'chocolatero', email: 'paquito@choco.com', password: '123123123' })
                    .then(targetUser =>
                        User.updateOne({ _id: user.id }, { $push: { likes: targetUser.id } })
                            .then(() => toggleLikeUser(user.id, targetUser.id))
                            .then(() => User.findById(user.id).lean())
                            .then(user => {
                                expect(user.likes.map(id => id.toString())).to.include(targetUser.id.toString())
                            })
                    )
            )
    )


    it('fails on non-existing user', () => {
        let _error

        const nonExistentUserId = new ObjectId()

        return User.create({ name: 'paquito', username: 'chocolatero', email: 'paquito@choco.com', password: '123123123' })
            .then(() => toggleLikeUser(nonExistentUserId.toString(), new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on existing user but non-existing target user', () => {
        let _error

        return User.create({ name: 'rosa', username: 'fit', email: 'rosa@fit.com', password: '123123123' })
            .then(user => toggleLikeUser(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('Target user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleLikeUser(123, new ObjectId().toString())
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
            toggleLikeUser('fit', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany()]))

    after(() => mongoose.disconnect())
})
