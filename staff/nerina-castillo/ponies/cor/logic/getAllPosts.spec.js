import 'dotenv/config';
import getAllPosts from "./getAllPosts.js";
import mongoose, { Types } from 'mongoose';

import { expect } from 'chai';
import { User, Post } from '../data/models.js';


describe('getAllPosts', () => {
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


    it('succeeds on existing user', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                getAllPosts('gonzalo', error => {
                    expect(user.username).to.equal('gonzalo')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        getAllPosts('gonza', error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')

            done()
        })
    })


    it('fails on non-string username', () => {
        let error

        try {
            getAllPosts(123, error => { })
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
            getAllPosts('gon', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(SyntaxError)
            expect(error.message).to.equal('invalid username')
        }
    })
    afterEach(done => {
        User.deleteMany()
            .then(() => Post.deleteMany())
            .then(() => done())
            .catch(error => done(error));
    });

    it('fails on non-function callback', () => {
        let error

        try {
            getAllPosts('gonzalo', 123)
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