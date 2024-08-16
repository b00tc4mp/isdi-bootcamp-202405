import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import { errors } from '../../com/index.js'
import getUsersByRole from './getUsersByRole.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getUsersByRole', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user with role', () => {
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(() => getUsersByRole('user'))
            .then(users => {
                expect(users).to.be.an('array').that.is.not.empty
                expect(users[0]).to.have.property('id')
                expect(users[0].name).to.equal('gon')
                expect(users[0].username).to.equal('gonzalo')
                expect(users[0].role).to.equal('user')
                expect(users[0].email).to.equal('gon@zalo.com')
                expect(users[0].password).to.equal('gonzalo123')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUsersByRole(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing role', () => {
        let _error

        return getUsersByRole('admin')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string role', () => {
        let error

        try {
            getUsersByRole(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('role is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})