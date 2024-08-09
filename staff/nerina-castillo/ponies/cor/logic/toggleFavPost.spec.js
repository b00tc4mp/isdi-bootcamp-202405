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
                Post.create({
                    author: user.id, image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine'
                });
            })
            .then(post => {
                toggleFavPost(user.id, post.id);
            })
            .then(() => User.findById(user.id))
            .then(updatedUser => {
                expect(updatedUser.favs).to.include(post.id.toString());
            });
    });

    it('succeeds on existing user and post has favs', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(createdUser => {
                user = createdUser;
                return Post.create({
                    author: user.id, image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine'
                });
            })
            .then(createdPost => {
                post = createdPost;
                return toggleFavPost(user.id, post.id);
            })
            .then(() => User.findById(user.id))
            .then(updatedUser => {
                expect(updatedUser.favs).to.include(post.id.toString());
            });
    });

    it('fails on non-existing user', () => {
        let _error

        return Post.create({ author: new ObjectId().toString(), image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf w testing' })
            .then(post => toggleFavPost(new ObjectId().toString(), post.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing post', () => {
        let _error

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: '123123123' })
            .then(user => toggleFavPost(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('post not found')
            })
    })

    it('fails on non-string username', () => {
        let error;

        try {
            toggleFavPost(123, new ObjectId().toString());
        } catch (_error) {
            error = _error;
        } finally {
            expect(error).to.be.instanceOf(ValidationError);
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('fails on non-string postId', () => {
        let error

        const userObjectId = new ObjectId

        try {
            toggleFavPost(userObjectId.toString(), 123)
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