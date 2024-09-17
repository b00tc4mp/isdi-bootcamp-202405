import 'dotenv/config'
import updateImage from './updateImage.js'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('updateImage', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'Rosa', surname: 'Fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user => updateImage(user.id, 'http://NewImage')
                .then(() => User.findOne({ username: 'rosafit' }).lean()
                    .then(user => {
                        expect(user.username).to.equal('rosafit')
                        expect(user.image).to.equal('http://NewImage') // Updated field name
                    })
                )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return updateImage(new ObjectId().toString(), 'http://NewImage')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateImage(123, 'http://NewImage')
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
            updateImage('', 'http://NewImage')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            updateImage(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid image URL', () => {
        let error

        try {
            updateImage(new ObjectId().toString(), 'not-a-valid-url')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
