import 'dotenv/config';
import getAllFollowingUserPosts from "./getAllFollowingUserPosts.js";
import mongoose, { Types } from 'mongoose';

import { expect } from 'chai';
import { User, Post } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('getAllFollowingUserPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI));

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));


    it('succeeds on existing user listing all following posts', () => {
        Post.create({ author: 'gonzalo', image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
            .then(post => {
                User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123', following: ['gonzalo'] })
                    .then(user => getAllFollowingUserPosts(user.username))
                User.findOne({ username: 'gonzalo' }).lean()
                    .then(user => expect(user.following).to.include(post.author))
            })
    })

    it('fails on non-existing user', () => {
        let _error

        getAllFollowingUserPosts('gonzalo', 'gonzalo123')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            getAllFollowingUserPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('username is not a string')
        }
    })

    it('fails on invalid username', () => {
        let error

        try {
            getAllFollowingUserPosts('gon')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    after(() => mongoose.disconnect());
});

