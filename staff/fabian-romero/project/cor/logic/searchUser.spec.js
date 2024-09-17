import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import searchUser from './searchUser.js'

import { User } from '../data/models.js'

import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

describe('searchUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeds on returning users', () =>
        User.create({ name: 'rosa', surname: 'fit', email: 'rosa@fit.com', username: 'rosafit', password: '123123123' })
            .then(user => {
                return User.create({ name: 'paquito', surname: 'choco', email: 'paquito@choco.com', username: 'paquitochoco', password: '123123123' })
                    .then(() => searchUser(user.id, 'paquitochoco'))
            })
            .then(users => {
                expect(users[0].username).to.equal('paquitochoco')
            })
    )

    it('fails on non-existing user', () => {
        let error

        try {
            searchUser(' ', 'fitness')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid userId')
        }
    })

    it('fails on non-string userId', () => {
        let error

        try {
            searchUser(123123, 'fitness')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })


    it('fails on non-string query', () => {
        let error

        try {
            searchUser('paquito', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('query is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})