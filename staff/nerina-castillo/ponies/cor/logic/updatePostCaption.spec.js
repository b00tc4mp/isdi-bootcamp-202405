
import 'dotenv/config';
import updatePostCaption from "./updatePostCaption.js";
import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

import { expect } from 'chai';
import { User, Post } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('updatePostCaption', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user and post', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                Post.create({ author: user.id, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
                    .then(post => updatePostCaption(user.id, post.id, 'okay...'))

                Post.findById(post.id).lean()
                    .then(post => {
                        expect(post.caption).to.equal('okay...')
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: new ObjectId().toString(), image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            .then(post => updatePostCaption(new ObjectId().toString(), post._id.toString(), 'i am fine'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    });

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: '123123123' })
            .then(user => updatePostCaption(user.id, new ObjectId().toString(), 'yoyoyo'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updatePostCaption(123, new ObjectId().toString(), 'i am fine')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string postId', () => {
        let error

        try {
            updatePostCaption(new ObjectId().toString(), 123, 'i am fine')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            updatePostCaption(new ObjectId().toString(), new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    after(() => mongoose.disconnect())
});