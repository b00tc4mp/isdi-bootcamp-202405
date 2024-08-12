import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from '../../com/index.js'
import searchItems from './searchItems.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('searchItems', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on search post', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Post.create({ author: user.id, image: null, text: 'maybe i know you, maybe i want you, or maybe i do not' })
                    .then(post1 =>
                        Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'i got it wrong' })
                            .then(post2 =>
                                searchItems(user.id, 'maybe')
                                    .then(result => {
                                        expect(result.posts).to.be.an('array').that.is.not.empty
                                        expect(result.posts[0].text).to.equal('maybe i know you, maybe i want you, or maybe i do not')
                                    })
                            )
                    )
            )
    })

    it('succeeds on search user', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                User.create({ name: 'barrenfields', username: 'barrenfields.band', role: 'band', email: 'barren@fields.com', password: 'barrenfields1' })
                    .then(user2 => {
                        searchItems(user.id, 'barren')
                            .then(result => {
                                expect(result.users).to.be.an('array').that.is.not.empty
                                expect(result.users[0].username).to.equal('barrenfields')
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        Post.create({ author: new ObjectId().toString(), image: null, text: 'maybe i know you, maybe i want you, or maybe i do not' })
            .then(post => searchItems(new ObjectId().toString(), 'maybe'))
            .then(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing author', () => {
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                Post.create({ author: new ObjectId().toString(), image: null, text: 'maybe i know you, maybe i want you, or maybe i do not' })
                    .then(() => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('author not found')
                    })
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            searchItems(123, 'query')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string query', () => {
        let error

        try {
            searchItems(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('query is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})