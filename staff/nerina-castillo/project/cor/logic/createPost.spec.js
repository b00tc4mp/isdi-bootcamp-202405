import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Post } from '../data/models.js'
import { errors } from '../../com/index.js'
import createPost from './createPost.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('createPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on create post with only text', () => {
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                createPost(user._id.toString(), null, 'hello')
            })
            .then(() => Post.findOne({ author: user._id }))
            .then(post => {
                expect(post).to.not.be.null
                expect(post.image).to.be.null
                expect(post.text).to.equal('hello')
            })
    })

    it('succeeds on create post with only image', () => {
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                createPost(user._id.toString(), 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', null)
            })
            .then(() => Post.findOne({ author: user._id }))
            .then(post => {
                expect(post).to.not.be.null
                expect(post.image).to.equal('https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                expect(post.text).to.be.null
            })
    })

    it('succeeds on create post with both text and image', () => {
        User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                createPost(user._id.toString(), 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'hello')
            })
            .then(() => Post.findOne({ author: user._id }))
            .then(post => {
                expect(post).to.not.be.null
                expect(post.image).to.equal('https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                expect(post.text).to.equal('hello')

            })
    })

    it('fails on non-existing user', () => {
        let _error

        return createPost(new ObjectId().toString(), 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'hello')
            .catch(error => {
                _error = error
            })
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-existing image and text', () => {
        let error;

        try {
            createPost(new ObjectId().toString(), '', '');
        } catch (_error) {
            error = _error;
        } finally {
            expect(error).to.be.instanceOf(ValidationError);
            expect(error.message).to.equal('either image or text must be provided');
        }
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createPost(123, 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 123, 'hello')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on non-string text', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('text is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
})
