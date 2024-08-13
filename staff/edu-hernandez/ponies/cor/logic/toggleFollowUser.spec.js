import 'dotenv/config'
import toggleFollowUser from "./toggleFollowUser.js"
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'


describe('toggleFollowUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on existing user but not toggled follow', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                User.create({
                    name: 'novak',
                    surname: 'djokovic',
                    email: 'novak@djokovic.com',
                    username: 'novak',
                    password: '123123123'
                })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'rfederer' }).lean()
                                .then(user => {
                                    expect(user.following).to.include('novak')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user toggled follow', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                User.create({
                    name: 'novak',
                    surname: 'djokovic',
                    email: 'novak@djokovic.com',
                    username: 'novak',
                    password: '123123123'
                })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'rfederer' }).lean()
                                .then(user => {
                                    expect(user.following).to.not.include('novak')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        toggleFollowUser('rfederer', 'novak', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
            done()
        })
    })

    it('fails on non-existing targetUser', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(user => {
                toggleFollowUser(user.username, 'novakdjokovic', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('targetUser not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-function callback', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                let error

                try {
                    toggleFollowUser('rfederer', 'novak', 23)
                } catch (_error) {
                    error = _error
                }

                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal('callback is not a function')

                done()
            })
            .catch(error => done(error))
    })

    afterEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})