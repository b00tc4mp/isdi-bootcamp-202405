import 'dotenv/config'
import updateUserPhone from './updateUserPhone.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors

describe('updateUserPhone', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating user phone', () =>
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => updateUserPhone(user.id, '966122211')
                .then(() => User.findOne({ email: 'ester@colero' }).lean()
                    .then(user => {
                        expect(user.email).to.equal('ester@colero')
                        expect(user.phone).to.equal('966122211')
                    })
                )
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return updateUserPhone(new ObjectId().toString(), '966122211')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            updateUserPhone(123, '966122211')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    it('fails on non-string phone', () => {
        let error

        try {
            updateUserPhone(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('phone is not a string')
        }
    })

    it('fails on invalid phone', () => {
        let error

        try {
            updateUserPhone(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid phone')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
