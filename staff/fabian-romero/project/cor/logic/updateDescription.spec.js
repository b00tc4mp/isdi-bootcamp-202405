import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User } from '../data/models.js'
import updateDescription from './updateDescription.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

const { ObjectId } = Types

describe('updateDescription', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany()]))

    it('succeeds on existing user', () =>
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                updateDescription(user.id, 'New description')
                    .then(() => User.findById(user.id).lean())
                    .then(user => expect(user.description).to.equal('New description'))
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return updateDescription(new ObjectId().toString(), 'New description')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateDescription(123, 'New description')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string description', () => {
        let error

        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => {
                try {
                    updateDescription(user.id, 123)
                } catch (_error) {
                    error = _error
                } finally {
                    expect(error).to.be.instanceOf(ValidationError)
                    expect(error.message).to.equal('description is not a string')
                }
            })
    })

    afterEach(() => Promise.all([User.deleteMany()]))

    after(() => mongoose.disconnect())
})
