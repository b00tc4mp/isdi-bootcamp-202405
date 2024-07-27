import 'dotenv/config';
import deletePost from "./deletePost.js";
import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types;

import { expect } from 'chai';
import { User, Post } from '../data/models.js';

describe('deletePost', () => {
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



    it('succeeds on existing user and post deleted', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                return Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' });
            })
            .then(post => {
                deletePost('gonzalo', post._id.toString(), error => {
                    if (error) {
                        return done(error);
                    }

                    Post.findById(post._id)
                        .then(post => {
                            expect(post).to.be.null;
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
                deletePost('gonzalo', post._id.toString(), error => {
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
                deletePost('gonzalo', new ObjectId().toString(), error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('post not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on existing user and post but post does not belong to user', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                User.create({ name: 'julito', surname: 'camelas', email: 'julito@camelas.com', username: 'julitocamelas', password: 'julito123' })
                    .then(julito => {
                        return Post.create({ author: 'julitocamelas', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'omg' })
                            .then(post => ({ user, post }));
                    })
                    .then(({ user, post }) => {
                        deletePost(user.username, post.id, error => {
                            expect(error).to.be.instanceOf(Error);
                            expect(error.message).to.equal('post does not belong to user');
                            done();
                        });
                    })
                    .catch(error => done(error));
            })
            .catch(error => done(error));
    });

    it('fails on non-string username', () => {
        let error

        try {
            deletePost(123, new ObjectId().toString(), error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            deletePost('gon', new ObjectId().toString(), error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-string post id', () => {
        let error

        try {
            deletePost('gonzalo', 123, error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('postId is not a string')
        }
    })

    it('fails on invalid postId', () => {
        let error

        try {
            deletePost('gonzalo', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('invalid postId')
        }
    })


    it('fails on non-function callback', () => {
        let error

        try {
            deletePost('gonzalo', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b761110pgvkxrhpf2tkaqu09q7pnjf8965roppj2sz210&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 123)
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