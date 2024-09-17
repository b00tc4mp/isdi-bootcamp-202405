import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getLikeUsers from './getLikeUsers.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getLikeUsers', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user =>
                User.create({ name: 'Paquito', surname: 'Choco', email: 'paquito@choco.com', username: 'paquito', password: '123123123' })
                    .then(targetUser => {
                        user.likes.push(targetUser._id)
                        return user.save()
                            .then(() =>
                                getLikeUsers(user.id)
                                    .then(likeUsers => {
                                        expect(likeUsers[0].id).to.equal(targetUser.id)
                                        expect(likeUsers).to.be.an('array')
                                        expect(likeUsers.length).to.equal(1)
                                    }))
                    })
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return getLikeUsers(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            getLikeUsers(123, new ObjectId().toString())
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
            getLikeUsers('', new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
