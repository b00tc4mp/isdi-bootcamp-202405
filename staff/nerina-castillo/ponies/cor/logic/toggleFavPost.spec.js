import 'dotenv/config';
import toggleFavPost from "./toggleFavPost.js";
import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

import { expect } from 'chai';
import { User, Post } from '../data/models.js';
import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('toggleFavPost', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI));

    beforeEach(() => Promise.all([User.deleteMany()]));

    it('succeeds on existing user and post has no favs', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine ' })
                    .then(post => toggleFavPost(user.username, post.id))

                User.findOne({ username: 'gonzalo' })
                    .then(user => {
                        expect(user.favs).to.include(post.id.toString());
                    })
            });
    });

    it('succeeds on existing user and post has favs', () => {
        Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf', likes: ['gonzalo'] })
            .then(post => {
                User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123', favs: [post.id] })
                    .then(() => toggleFavPost('gonzalo', post.id))

                User.findOne({ username: 'gonzalo' }).lean()
                    .then(user => {
                        expect(user.favs).to.not.include(post.id)
                    })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        Post.create({ author: 'gon', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            .then(() => toggleFavPost('gonzalo', post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError);
                expect(_error.message).to.equal('user not found');
            })
    });

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => toggleFavPost('gonzalo', new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError);
                expect(_error.message).to.equal('post not found');
            })

    });

    it('fails on non-string username', () => {
        let error;

        try {
            toggleFavPost(123, 'julitocamelas');
        } catch (_error) {
            error = _error;
        } finally {
            expect(error).to.be.instanceOf(ValidationError);
            expect(error.message).to.equal('username is not a string');
        }
    });

    it('fails on invalid username', () => {
        let error

        try {
            toggleFavPost('', new ObjectId().toString())
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
            toggleFavPost('gonzalo', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany()]));

    after(() => mongoose.disconnect());
});