import 'dotenv/config';
import createPost from "./createPost.js";
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types


import { expect } from 'chai';
import { User, Post } from '../data/models.js';

const { NotFoundError, ValidationError } = errors


import { errors } from '../../com/index.js'

describe('createPost', () => {

    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Post.deleteMany()])
    )

    it('succeeds on create post', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'hashedpassword' })
            .then(user => {
                createPost(user._id.toString(), 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'i am fine');
            })
            .then(() => Post.findOne({ author: user._id }))
            .then(post => {
                expect(post).to.not.be.null;
                expect(post.image).to.equal('https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g');
                expect(post.caption).to.equal('i am fine');
            });
    });

    it('fails on non-existing user', () => {
        let _error;

        return createPost(new ObjectId().toString(), 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'i am fine')
            .catch(error => {
                _error = error;
            })
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError);
                expect(_error.message).to.equal('user not found');
            });
    });

    it('fails on non-string image', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 123, 'i am fine')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('invalid image', () => {
        let error

        try {
            createPost(new ObjectId().toString(), '', 'i am fine')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost(new ObjectId().toString(), 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 123)
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