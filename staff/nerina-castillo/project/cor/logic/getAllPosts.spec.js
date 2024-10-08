import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import errors from '../../com/errors.js'
import getAllPosts from './getAllPosts.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getAllPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user listing all posts', () =>
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'hello', likes: [] }) // Sin likes
                    .then(post1 =>
                        Post.create({ author: user.id, image: null, text: 'byeeeee', likes: [user.id] })
                            .then(post2 =>
                                getAllPosts(user.id)
                                    .then(posts => {
                                        expect(posts[0].author.id).to.equal(user.id)
                                        expect(posts[1].author.id).to.equal(user.id)
                                        expect(posts[0].author.username).to.equal(user.username)
                                        expect(posts[1].author.username).to.equal(user.username)
                                        expect(posts[0].author.avatar).to.equal(user.avatar)
                                        expect(posts[1].author.avatar).to.equal(user.avatar)
                                        expect(posts[0].author.following).to.be.false
                                        expect(posts[1].author.following).to.be.false
                                        expect(posts[0].like).to.be.true
                                        expect(posts[1].like).to.be.false
                                    })
                            )
                    )
            )
    )

    it('fails on post with non-existing author', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                return Post.create({
                    author: new ObjectId().toString(),
                    image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif',
                    text: 'hello'
                })
                    .then(() => {
                        return getAllPosts(user.id)
                            .catch(error => {
                                _error = error
                            })
                    })
                    .finally(() => {
                        expect(_error).to.be.instanceOf(NotFoundError)
                        expect(_error.message).to.equal('author not found')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllPosts(new ObjectId().toString(), 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'hello')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })

    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllPosts(123, 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})