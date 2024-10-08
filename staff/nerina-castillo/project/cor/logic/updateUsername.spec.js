import 'dotenv/config'
import updateUsername from './updateUsername.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors
const { ObjectId } = Types

describe('updateUsername', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: '123123123' })
            .then(user => updateUsername(user.id, 'gonZalo')
                .then(() => User.findOne({ username: 'gonZalo' }).lean()
                    .then(user => {
                        expect(user.username).to.equal('gonZalo')
                    })
                )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return updateUsername(new ObjectId().toString(), 'gonZalo')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateUsername(123, 'gonZalo')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            updateUsername(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})