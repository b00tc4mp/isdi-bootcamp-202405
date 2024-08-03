import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import toggleFollowUser from './toggleFollowUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'


const { ValidationError } = errors

describe('toggleFollowUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on existing user and targetUser with no follow', () =>
        User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(user =>
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
                    .then(targetUser =>
                        toggleFollowUser(user.id, targetUser.id)
                            .then(() => User.findOne({ username: 'lilideponte' }).lean())
                            .then(user => expect(user.following).to.include('samuspine'))

                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user => toggleFollowUser(new ObjectId().toString(), user.id)
                .catch(error => _error = error)
                .finally(() => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('User not found')

                })
            )
    })

    it('fails on non-existing targetUser', () => {
        let _error

        return User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(user => toggleFollowUser(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(__filenameerror).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('TargetUser not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleFollowUser(123, 'lilideponte')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string targetUserId', () => {
        let error

        try {
            toggleFollowUser(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUserId is not a string')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())

})

