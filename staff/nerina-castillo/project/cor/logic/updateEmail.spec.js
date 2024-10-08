import 'dotenv/config'
import updateEmail from './updateEmail.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors
const { ObjectId } = Types

describe('updateEmail', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: '123123123' })
            .then(user => updateEmail(user.id, 'gonz@alo.com')
                .then(() => User.findOne({ email: 'gonz@alo.com' }).lean()
                    .then(user => {
                        expect(user.email).to.equal('gonz@alo.com')
                    })
                )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return updateEmail(new ObjectId().toString(), 'gonz@alo.com')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateEmail(123, 'gonz@alo.com')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string email', () => {
        let error

        try {
            updateEmail(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('email is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})