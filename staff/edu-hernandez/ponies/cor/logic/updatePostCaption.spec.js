
import 'dotenv/config'
import updatePostCaption from "./updatePostCaption.js"
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { ValidationError } = errors
const { ObjectId } = Types

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
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                return Post.create({
                    author: 'rfederer',
                    image: 'https://example.com/image.gif',
                    caption: 'any caption'
                })
            })
            .then(post => {
                updatePostCaption(
                    'rfederer',
                    post._id.toString(),
                    'post caption updated',
                    error => {
                        if (error) {
                            return done(error)
                        }

                        Post.findById(post._id)
                            .then(post => {
                                expect(post).to.not.be.null
                                expect(post.caption).to.equal('post caption updated')
                                done()
                            })
                            .catch(error => done(error))
                    })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(post => {
                updatePostCaption(
                    'nonexistentuser',
                    post._id.toString(),
                    'new caption',
                    error => {
                        try {
                            expect(error).to.be.instanceOf(Error)
                            expect(error.message).to.equal('user not found')

                            done()
                        } catch (assertionError) {
                            done(assertionError)
                        }
                    })
            })
            .catch(error => done(error))
    })

    it('fails on invalid username', () => {
        let error

        try {
            updatePostCaption('rfederer', new ObjectId().toString(), 'new caption', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string username', () => {
        let error

        try {
            updatePostCaption(123, new ObjectId().toString(), 'new caption', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            updatePostCaption('rfederer', 123, 'new caption', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on invalid postId', () => {
        let error

        try {
            updatePostCaption('rfederer', '', 'new caption', error => { })

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('invalid postId')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption('rfederer', new ObjectId().toString(), 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('caption is not a string')
        }
    })

    it('fails on non-function callback', () => {
        let error

        try {
            updatePostCaption('rfederer', new ObjectId().toString(), 'new caption', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
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