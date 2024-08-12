import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user listing all posts', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(post1 =>
                        Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                            .then(post2 =>
                                getAllPosts(user.id)
                                    .then(posts => {
                                        debugger
                                        expect(posts[0].author.id).to.equal(user.id)
                                        expect(posts[1].author.id).to.equal(user.id)
                                        expect(posts[0].author.username).to.equal(user.username)
                                        expect(posts[1].author.username).to.equal(user.username)
                                        expect(posts[0].author.avatar).to.equal(user.avatar)
                                        expect(posts[1].author.avatar).to.equal(user.avatar)
                                        expect(posts[0].author.following).to.be.false
                                        expect(posts[1].author.following).to.be.false
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllPosts(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('User not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('UserId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})