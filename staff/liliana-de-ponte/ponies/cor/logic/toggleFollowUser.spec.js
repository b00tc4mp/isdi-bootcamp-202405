import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import toggleFollowUser from './toggleFollowUser.js'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'


const { ValidationError, NotFoundError, DuplicityError } = errors

describe('toggleFollowUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on existing user and targetUser with no follow', done => {
        User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(() => {
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
                    .then(() => {
                        toggleFollowUser('lilideponte', 'samuspine', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'lilideponte' }).lean()
                                .then(user => {
                                    expect(user.following).to.include('samuspine')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    // it('fails on non-existing user', () => {
    //     User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
    //         .then(() => {
    //             toggleFollowUser('lilideponte', 'samuspine', error => {
    //                 expect(error).to.be.instanceOf(NotFoundError)
    //                 expect(error.message).to.equal('User not found')

    //             })
    //         })
    //         .catch(error => done(error))
    // })

    // it('fails on non-existing targetUser', done => {
    //     User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
    //         .then(() => {
    //             toggleFollowUser('lilideponte', 'samuspine', error => {
    //                 expect(error).to.be.instanceOf(NotFoundError)
    //                 expect(error.message).to.equal('TargetUser not found')

    //                 done()
    //             })
    //         })
    //         .catch(error => done(error))
    // })

    it('fails on non-string username', () => {
        let error

        try {
            toggleFollowUser(123, 'lilideponte', error => { })
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
            toggleFollowUser('', 'lilideponte', error => { })
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
            toggleFollowUser('samuspine', 123, error => { })
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
            toggleFollowUser('samuspine', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid targetUsername')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            toggleFollowUser('samuspine', 'lilideponte', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

    afterEach(done => {
        User.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })

})
