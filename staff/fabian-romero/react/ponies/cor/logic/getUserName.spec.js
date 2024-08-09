import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import getUserName from './getUserName.js'
import { User } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getUserName', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user', () => {
        User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user => getUserName(user.username, user.username)
                .then(() => {
                    expect(targetUser.name).to.equal('Mono')
                    expect(targetUser.surname).to.equal('Loco')
                    expect(targetUser.email).to.equal('mono@loco.com')
                    expect(targetUser.username).to.equal('monoloco')
                })
            )

    })


    it('fails on non-existing user', () => {
        getUserName('monoloco', 'monoloco', error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('User not found')
        })
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserName(123, 'monoloco')
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
            getUserName('', 'monoloco')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string targetUsername', () => {
        let error

        try {
            getUserName('monoloco', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid tagretUsername', () => {
        let error

        try {
            getUserName('monoloco', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})
