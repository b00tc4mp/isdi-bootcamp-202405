import 'dotenv/config'
import updateDescription from './updateDescription.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors
const { ObjectId } = Types

describe('updateDescription', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: '123123123' })
            .then(user => updateDescription(user.id, 'Nueva descripción')
                .then(() => User.findOne({ username: 'gonzalo' }).lean()
                    .then(user => {
                        expect(user.username).to.equal('gonzalo')
                        expect(user.description).to.equal('Nueva descripción')
                    })
                )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return updateDescription(new ObjectId().toString(), 'Descripción')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateDescription(123, 'Descripción')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string description', () => {
        let error

        try {
            updateDescription(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('newDescription is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})