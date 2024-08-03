import 'dotenv/config'
import getAllPoniesPosts from './getAllPoniesPosts.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

// OJOOOOOO ME FALTA ACTUALIZARLO

describe('getAllPoniesPosts', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user listing all ponies posts', done => {
        Post.create({ author: 'tatig', image: 'https://www.vistaoftalmologos.es/wp-content/uploads/2019/11/Depositphotos_2186038_l-2015.jpg', caption: 'gatico' })
            .then(post => {
                User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', following: ['tatig'] })
                    .then(user => {
                        getAllPoniesPosts(user.username, (error, posts) => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            console.log(posts)

                            User.findOne({ username: 'tatig' }).lean()
                                .then(user => {
                                    expect(user.following).to.include(post.author)

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and no posts returning empty array ', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                getAllPoniesPosts('tatig', (error, posts) => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    expect(posts).to.be.an('array')
                    expect(posts.length).to.equal(0)

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({ author: new ObjectId(), image: 'https://www.vistaoftalmologos.es/wp-content/uploads/2019/11/Depositphotos_2186038_l-2015.jpg', caption: 'gatico' })
            .then(post => {
                getAllPoniesPosts('tatig', (error, posts) => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on invalid username', () => {
        let error

        try {
            getAllPoniesPosts('')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    afterEach(done => {
        User.deleteMany()
            .then(() => {
                Post.deleteMany()
                    .then(() => done())
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => error(error))
    })
})