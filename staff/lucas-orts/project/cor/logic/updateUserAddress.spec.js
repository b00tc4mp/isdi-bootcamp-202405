import 'dotenv/config'
import updateUserAddress from './updateUserAddress.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors

describe('updateUserAddress', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating user address', () =>
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => updateUserAddress(user.id, 'calle Jolgorio 23, Bilbao')
                .then(() => User.findOne({ email: 'ester@colero' }).lean()
                    .then(user => {
                        expect(user.email).to.equal('ester@colero')
                        expect(user.address).to.equal('calle Jolgorio 23, Bilbao')
                    })
                )
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return updateUserAddress(new ObjectId().toString(), 'calle Jolgorio 23, Bilbao')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            updateUserAddress(123, 'calle Jolgorio 23, Bilbao')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    it('fails on non-string address', () => {
        let error

        try {
            updateUserAddress(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('address is not a string')
        }
    })

    it('fails on invalid address', () => {
        let error

        try {
            updateUserAddress(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid address')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
