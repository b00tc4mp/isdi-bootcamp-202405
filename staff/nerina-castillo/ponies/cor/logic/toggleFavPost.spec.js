import 'dotenv/config';
import toggleFavPost from "./toggleFavPost.js";
import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

import { expect } from 'chai';
import { User, Post } from '../data/models.js';
import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('toggleFavPost', () => {
    let post;

    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error));
    });

    beforeEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error));
    });

    it('succeeds on existing user and post has no favs', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine ' })
                    .then(post => ({ user, post }));
            })
            .then(({ user, post }) => {
                toggleFavPost(user.username, post.id, error => {
                    if (error) {
                        return done(error);
                    }

                    User.findOne({ username: 'gonzalo' })
                        .then(user => {
                            expect(user.favs).to.include(post.id.toString());
                            done();
                        })
                        .catch(error => done(error));
                });
            })
            .catch(error => done(error));
    });

    it('succeeds on existing user and post has favs', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                return Post.create({
                    author: 'gonzalo',
                    image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
                    caption: 'i am fine',
                    favs: ['gonzalo']
                })
                    .then(post => ({ user, post }));
            })
            .then(({ user, post }) => {
                toggleFavPost(user.username, post.id, error => {
                    if (error) {
                        return done(error);
                    }

                    User.findOne({ username: user.username }).lean()
                        .then(updatedUser => {
                            expect(updatedUser.favs).to.not.include(post.id);
                            done();
                        })
                        .catch(error => done(error));
                });
            })
            .catch(error => done(error));
    });

    it('fails on non-existing user', done => {
        Post.create({ author: 'gon', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            .then(createdPost => {
                post = createdPost;
                toggleFavPost('gonzalo', post.id, error => {
                    expect(error).to.be.instanceOf(NotFoundError);
                    expect(error.message).to.equal('user not found');
                    done();
                });
            })
            .catch(error => done(error));
    });

    it('fails on existing user but non-existing post', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                toggleFavPost('gonzalo', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(NotFoundError);
                    expect(error.message).to.equal('post not found');
                    done();
                });
            })
            .catch(error => done(error));
    });

    it('fails on non-function callback', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine ' });
            })
            .then(createdPost => {
                post = createdPost;
                let error;
                try {
                    toggleFavPost('gonzalo', post.id.toString(), 123);
                } catch (_error) {
                    error = _error;
                } finally {
                    expect(error).to.be.instanceOf(ValidationError);
                    expect(error.message).to.equal('callback is not a function');
                    done();
                }
            })
            .catch(error => done(error));
    });

    afterEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error));
    });

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error));
    });
});