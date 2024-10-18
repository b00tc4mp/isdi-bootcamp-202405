import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import getUserName from './getUserName.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getUserName', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and target user', () => {
        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '630734321', address: 'calle Navas 32, Huesca ', password: '123123123' })
            .then(user => {
                return getUserName(user.id, user.id)
                    .then((name) => {
                        expect(name).to.equal('Ester')
                    })
            })
    })



    it('fails on non-existing user', () => {
        let _error

        return getUserName(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '630734321', address: 'calle Navas 32, Huesca ', password: '123123123' })
            .then(user => getUserName(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('target user not found')
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
            expect(error.message).to.equal('userId is not a string')
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
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})