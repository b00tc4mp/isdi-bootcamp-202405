import 'dotenv/config'
import getAllFavPosts from './getAllFavPosts.js'
import mongoose from 'mongoose'

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllFavPosts', () => {
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

    it('succeeds on existing user listing all fav posts', done => {
        Post.create({ author: 'tatig', image: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/044D/production/_103710110_0a.gettyimages-897584432.jpg.webp', caption: 'carlino' })
            .then(post => {
                User.create({ name: 'Tati', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', favs: [post.id] })
                    .then(user => {
                        getAllFavPosts(user.username, (error, posts) => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            console.log(posts)

                            User.findOne({ username: 'tatig' })
                                .then(user => {
                                    expect(user.favs).to.include(post.id)

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on invalid username', () => {
        let error

        try {
            getAllFavPosts('', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-existing user', done => {
        getAllFavPosts('pepe', (error, posts) => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')

            done()
        })
    })

    it('fails on callback is not a function', () => {
        let error

        try {
            getAllFavPosts('tatig', 123)
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