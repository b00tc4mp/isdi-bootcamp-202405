import 'dotenv/config'
import updateAvatar from './updateAvatar.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors
const { ObjectId } = Types

describe('updateAvatar', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: '123123123' })
            .then(user => updateAvatar(user.id, 'http://text')
                .then(() => User.findOne({ username: 'gonzalo' }).lean()
                    .then(user => {
                        expect(user.username).to.equal('gonzalo')
                        expect(user.avatar).to.equal('http://text')
                    })
                )
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return updateAvatar(new ObjectId().toString(), 'http://text')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })


    it('fails on non-string userId', () => {
        let error

        try {
            updateAvatar(123, 'http://text')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string avatar', () => {
        let error

        try {
            updateAvatar(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('avatar is not a string')
        }
    })

    it('fails on invalid avatar', () => {
        let error

        try {
            updateAvatar(new ObjectId().toString(), '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid avatar')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
