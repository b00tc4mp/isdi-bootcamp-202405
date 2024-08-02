import 'dotenv/config'
import getUserList from './getUserList.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('getUserList', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user returning userList', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUserList('monoloco'))
            .then(userList => {
                expect(userList).to.be.an('array')
                expect(userList).to.include('monoloco')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUserList('monoloco')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })

    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserList(123, 'eden')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            getUserList('', 'eden')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})