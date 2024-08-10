import 'dotenv/config'
import toggleFavPost from './toggleFavPost.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('toggleFavPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on existing user and post with no favs', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user =>
                Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning' })
                    .then(post =>
                        toggleFavPost(user.username, post.id)
                            .then(() => User.findOne({ username: 'samuspine' }))
                            .then(user =>
                                expect(user.favs).to.include(post.id))
                    )
            )
    )

    it('succeeds on existing user and post with favs', () =>
        Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning', likes: ['samuspine'] })
            .then(post =>
                User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789', favs: [post.id] })
                    .then(post => toggleFavPost(user.username, post.id))
                    .then(() => User.findOne({ username: 'samuspine' }).lean())
                    .then(user => expect(user.favs).to.not.include(post.id)
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: 'samuspine', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'morning' })
            .then(post => toggleFavPost('samuspine', post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })


    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(() => toggleFavPost('samuspine', new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('post not found')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            toggleFavPost(123, 'dckbjks648748')
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
            toggleFavPost('', 'dbhhjde788')
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
            toggleFavPost('samuspine', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on invalid postId', () => {
        let error

        try {
            toggleFavPost('samuspine', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('Invalid postId')
        }
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())

})





