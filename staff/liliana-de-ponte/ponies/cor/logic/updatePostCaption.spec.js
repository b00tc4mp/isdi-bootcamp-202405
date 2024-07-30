import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import updatePostCaption from './updatePostCaption.js'
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
        Post.deleteMany({})
            .then(() => done())
            .catch(error => done(error))
    })

    it('succeeds on existing user and post', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => {
                Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning' })
                    .then(post => {
                        updatePostCaption('samuspine', post.id, 'nigth', error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            Post.findById(post.id).lean()
                                .then(post => {
                                    expect(post.caption).to.equal('nigth')

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
            updatePostCaption('', 'hdkshsj55868', 'morning', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string postId', () => {
        let error
        try {
            updatePostCaption('samuspine', 123, 'morning', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    // it('fails on invalid postId', () => {
    //     let error

    //     try {
    //         updatePostCaption('samuspine', '', 'morning', error => { })
    //     } catch (_error) {
    //         error = _error
    //     } finally {
    //         expect(error).to.be.instanceOf(SyntaxError)
    //         expect(error.message).to.equal('invalid postId')
    //     }
    // })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption('samuspine', 'sfhbjfsbs7585', 123, error => { })
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
            updatePostCaption('samuspine', 'ksdhkcfs6778', 'morning', 123)
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



