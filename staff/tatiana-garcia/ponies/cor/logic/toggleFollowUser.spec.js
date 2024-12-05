import 'dotenv/config'
import toggleFollowUser from './toggleFollowUser.js'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import { User } from '../data/models.js'

import { errors } from '../../com/index.js'
const { ValidationError, NotFoundError } = errors

// OJOOOOOO ME FALTA ACTUALIZARLO

describe('toggleFollowUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and follow is not toggled', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                User.create({ name: 'Alberto', surname: 'Garcia', email: 'abt@garcia.com', username: 'abtg', password: '123123123' })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'tatig' }).lean()
                                .then(user => {
                                    expect(user.following).to.include('abtg')

                                    done()
                                })
                                .catch(error => done())
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and follow is toggled', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                User.create({ name: 'Alberto', surname: 'Garcia', email: 'abt@garcia.com', username: 'abtg', password: '123123123' })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'tatig' }).lean()
                                .then(user => {
                                    expect(user.following).to.not.include(['abtg'])

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', () => {
        toggleFollowUser('tatig', 'abtg', error => {
            expect(error).to.be.instanceOf(NotFoundError);
            expect(error.message).to.equal('user not found');

        })
    })

    it('fails on non-existing target user', () => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(() => {
                toggleFollowUser('tatig', 'pepe', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('target user not found')

                })
            })
            .catch(error => done(error))
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})
