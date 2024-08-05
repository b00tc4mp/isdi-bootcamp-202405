import 'dotenv/config'
import toggleLikePost from "./toggleLikePost.js";
import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Post } from '../data/models.js';

describe('toggleLikePost', () => {
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

    it('succeeds on existing user and post has no likes', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine ' });
            })
            .then(post => {
                toggleLikePost('gonzalo', post.id, error => {
                    if (error) {
                        return done(error);
                    }

                    Post.findById(post.id).lean()
                        .then(post => {
                            expect(post.likes).to.include('gonzalo');
                            done();
                        })
                        .catch(error => done(error));
                });
            })
            .catch(error => done(error));
    });

    it('succeeds on existing user and post has likes', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine ', likes: ['gonzalo'] });
            })
            .then(post => {
                toggleLikePost('gonzalo', post.id, error => {
                    if (error) {
                        return done(error);
                    }

                    Post.findById(post.id).lean()
                        .then(post => {
                            expect(post.likes).to.not.include('gonzalo');
                            done();
                        })
                        .catch(error => done(error));
                });
            })
            .catch(error => done(error));
    });

    it('fails on non-existing user', done => {
        Post.create({ author: 'gon', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            .then(post => {
                toggleLikePost('gonzalo', post.id, error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('user not found')

                    done()
                });
            })
            .catch(error => done(error));
    });

    it('fails on existing user but non-existing post', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                toggleLikePost('gonzalo', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-function callback', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine ' });
            })
            .then(createdPost => {
                post = createdPost;
                let error;
                try {
                    toggleLikePost('gonzalo', post.id.toString(), 123);
                } catch (_error) {
                    error = _error;
                } finally {
                    expect(error).to.be.instanceOf(TypeError);
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