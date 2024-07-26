import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import createPost from './createPost.js'
import { User, Post } from '../data/models.js'

describe('createPost', () => {
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

    it('succeds on new post', done => {
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => {
                createPost('samuspine', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'morning', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    Post.findOne({ author: 'samuspine' })
                        .then(post => {
                            expect(post.image).to.equal('https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                            expect(post.caption).to.equal('morning')

                            done()
                        })
                        .catch(error => done(error))
                })
            })

        it('fails on non-string username', () => {
            let error

            try {
                createPost(123, 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'morning', error => { })
            } catch (_error) {
                error = _error
            } finally {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal('username is not a string')

            }
        })

        it('fails on invalid username', () => {
            let error

            try {
                createPost('', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'morning', error => { })
            } catch (_error) {
                error = _error
            } finally {
                expect(error).to.be.instanceOf(SyntaxError)
                expect(error.message).to.equal('invalid username')
            }
        })

        it('fails on non-function callback', () => {
            let error

            try {
                createPost('samuspine', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'morning', 123)
            } catch (_error) {
                error = _error
            } finally {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal('callback is not a function')
            }
        })

        it('fails on non-string email', () => {
            let error

            try {
                createPost('samuspine', 1234, 'morning', error => { })
            } catch (_error) {
                error = _error
            } finally {
                expect(error).to.be.instanceOf(TypeError)
                expect(error.message).to.equal('username is not a string')
            }
        })

        it('fails on invalid url non-startsWith http', () => {
            let error

            try {
                createPost('samuspine', '//media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'morning', error => { })
            } catch (_error) {
                error = _error
            } finally {
                expect(error).to.be.instanceOf(SyntaxError)
                expect(error.message).to.equal('invalid username')
            }
        })

        afterEach(done => {
            Post.deleteMany({})
                .then(() => done())
                .catch(error => done(error))
        })

        after(done => {
            mongoose.disconnect()
                .then(() => done())
                .catch(error => done(error))
        })
    })
})

