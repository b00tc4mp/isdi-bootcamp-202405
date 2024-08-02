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
            .then(() =>
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
                    .then(() =>
                        toggleFollowUser('lilideponte', 'samuspine')
                            .then(() => User.findOne({ username: 'lilideponte' }).lean())
                            .then(user => expect(user.following).to.include('samuspine'))

                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => toggleFollowUser('lilideponte', 'samuspine')
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
            .then(() => toggleFollowUser('lilideponte', 'samuspine'))
            .catch(error => _error = error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('TargetUser not found')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleFollowUser(123, 'lilideponte')
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
            toggleFollowUser('', 'lilideponte')
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
            toggleFollowUser('samuspine', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('targetUsername is not a string')
        }
    })

    it('fails on invalid targetUsername', () => {
        let error

        try {
            toggleFollowUser('samuspine', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUsername')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())

})

