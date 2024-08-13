import 'dotenv/config.js'
import createPost from './createPost.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { ValidationError } = errors
const { ObjectId } = Types

describe('createPost', () => {
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

    it('succeeds on creating a new post', done => {
        User.create({
            name: 'Roger',
            surname: 'Federer',
            email: 'roger@federer.com',
            username: 'rfederer',
            password: '123123123'
        })
            .then(() => {
                createPost(
                    'rfederer',
                    'https://example.com/image.gif',
                    'any caption',
                    error => {
                        if (error) {
                            console.log(error)

                            return
                        }
                        Post.findOne({ author: 'rfederer' })
                            .then(post => {
                                expect(post.author).to.include('rfederer')

                                done()
                            })
                            .catch(error => done(error))
                    })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        createPost(
            'rfederer',
            'https://example.com/image.gif',
            'any caption',
            error => {
                expect(error).to.be.instanceOf(ValidationError)
                expect(error.message).to.equal('User not found')

                done()
            })
    })

    it('fails on invalid image', () => {
        let error

        try {
            createPost(
                'rfederer',
                'https://example.com/image.gif',
                'any caption',
                error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createPost(
                'rfederer',
                'https://example.com/image.gif',
                'any caption',
                error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost(
                'rfederer',
                'https://example.com/image.gif',
                23,
                error => { })
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
            createPost(
                'rfederer',
                'https://example.com/image.gif',
                'any caption',
                23)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('callback is not a function')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())

})