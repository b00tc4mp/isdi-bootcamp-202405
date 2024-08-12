import 'dotenv/config';
import createPost from "./createPost.js";
import mongoose, { Types } from 'mongoose';

import { expect } from 'chai';
import { User, Post } from '../data/models.js';

describe('createPost', () => {

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

    it('succeeds on create post', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                createPost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'i am fine', (error) => {
                    if (error) {
                        return done(error);
                    }

                    Post.findOne({ author: 'gonzalo' }).lean()
                        .then(post => {
                            expect(post).to.not.be.null;
                            expect(post.image).to.equal('https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g');
                            expect(post.caption).to.equal('i am fine');
                            done();
                        })
                        .catch(error => done(error));
                });
            })
            .catch(error => done(error));
    });


    it('fails on non-existing user', done => {
        createPost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'i am fine', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('User not found')

            done()
        })
    })


    it('fails on non-string image', () => {
        let error

        try {
            createPost('gonzalo', 123, 'i am fine', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid image', () => {
        let error

        try {
            createPost('gonzalo', '', 'i am fine', error => { })

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid image')
        }
    })

    it('fails on non-string caption', () => {
        let error

        try {
            createPost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('caption is not a string')
        }
    })
    it('fails on non-function callback', () => {
        let error

        try {
            createPost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'i am fine', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('callback is not a function')
        }
    })

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