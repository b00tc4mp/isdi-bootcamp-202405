import 'dotenv/config'
import getAllMatchs from './getAllMatchs.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllMatchs', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and matches', () => {
        return User.create({ name: 'rosa', surname: 'fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123', likes: [] })
            .then(user =>
                User.create({ name: 'paquito', surname: 'chocolatero', email: 'paquito@chocolatero.com', username: 'paquito', password: '123123123', likes: [user._id] })
                    .then(targetUser => {
                        user.likes.push(targetUser._id)
                        return user.save()
                            .then(() =>
                                getAllMatchs(user._id.toString())
                                    .then(matches => {
                                        expect(matches).to.be.instanceOf(Array)
                                        expect(matches).to.have.length(1)
                                        expect(matches[0].id).to.equal(targetUser.id)
                                    })
                            )
                    })
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllMatchs(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllMatchs(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    it('fails on invalid userId', () => {
        let error

        try {
            getAllMatchs('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid UserId')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
