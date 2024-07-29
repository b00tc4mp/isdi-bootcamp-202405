import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('getAllPosts', () => {
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

    it('succeeds on existing user listing all posts', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', following: ['tatig'] })
            .then(user => {
                Post.create({ author: 'tatig', image: 'https://www.ngenespanol.com/wp-content/uploads/2023/08/monogamia-en-animales-la-verdad-tras-esta-practica.jpg', caption: 'pinguinos' })
                    .then(post1 => {
                        Post.create({ author: 'tatig', image: 'https://www.vistaoftalmologos.es/wp-content/uploads/2019/11/Depositphotos_2186038_l-2015.jpg', caption: 'gatico' })
                            .then(post2 => {
                                getAllPosts(user.username, (error, posts) => {
                                    if (error) {
                                        console.error(error)

                                        return
                                    }

                                    console.log(posts)

                                    Post.find({}).lean()
                                        .then(posts => {
                                            expect(posts[0].author).to.equal(post1.author)
                                            expect(posts[1].author).to.equal(post2.author)

                                            done()
                                        })
                                        .catch(error => done(error))
                                })
                            })
                            .catch(error => done(error))
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', following: ['tatig'] })
            .then(() => {
                getAllPosts('pepe', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('user not found')

                    done()
                })
            })
            .catch(error => done(error))


    })

    it('fails on non-string username', () => {
        let error

        try {
            getAllPosts(123, error => { })
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
            getAllPosts('a', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on callback is not a function', () => {
        let error

        try {
            getAllPosts('tatig', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
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
            .catch(error => done(error))
    })
})