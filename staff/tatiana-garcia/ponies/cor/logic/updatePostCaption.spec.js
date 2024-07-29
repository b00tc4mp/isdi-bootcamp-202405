import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js"
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('updatePostCaption', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error))
    })

    beforeEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error))
    })



    it('succeeds on existing user and post', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            })
            .then(post => {
                updatePostCaption('gonzalo', post._id.toString(), 'updated caption', (error, updatedPost) => {
                    if (error) {
                        return done(error)
                    }

                    Post.findById(post._id)
                        .then(post => {
                            expect(post).to.not.be.null
                            expect(post.caption).to.equal('updated caption')
                            done()
                        })
                        .catch(error => done(error))
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        Post.create({ author: 'gon', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            .then(post => {
                updatePostCaption('nonexistentuser', post._id.toString(), 'new caption', (error, updatedPost) => {
                    try {
                        expect(updatedPost).to.be.undefined
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                        done()
                    } catch (assertionError) {
                        done(assertionError)
                    }
                })
            })
            .catch(error => done(error))
    })



    it('fails on non-string username', () => {
        let error

        try {
            updatePostCaption(123, new ObjectId().toString(), 'i am fine', error => { })
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
            updatePostCaption('gon', new ObjectId().toString(), 'i am fine', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption('gonzalo', new ObjectId().toString(), 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            updatePostCaption('gonzalo', new ObjectId().toString(), 'i am fine', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

    afterEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error))
    })

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error))
    })
})