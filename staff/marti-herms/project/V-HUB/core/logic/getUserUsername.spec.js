import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import getUserUsername from './getUserUsername.js'
import { User } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

describe('getUserUsername', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user returning username', () => {
        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => getUserUsername(user.id, user.id))
            .then(name => {
                expect(name).to.be.an('string')
                expect(name).to.include('monoloco')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUserUsername('66b941110938786955ecf3b5', '66b941110938786955ecf3b5')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ username: 'monoloco', email: 'mono@loco.com', password: '123123123' })
            .then(user => getUserUsername(user.id, '66b941110938786955ecf3b5'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('targetUser not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getUserUsername(123, 'eden')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    // it('fails on invalid userId', () => {
    //     let error

    //     try {
    //         getUserUsername('', 'eden')
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(ValidationError)
    //         expect(error.message).to.equal('invalid userId')
    //     }
    // })

    it('fails on non-string targetUserId', () => {
        let error

        try {
            getUserUsername('eden', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })

    // it('fails on invalid targetUserId', () => {
    //     let error

    //     try {
    //         getUserUsername('eden', '')
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(ValidationError)
    //         expect(error.message).to.equal('invalid targetUserId')
    //     }
    // })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})