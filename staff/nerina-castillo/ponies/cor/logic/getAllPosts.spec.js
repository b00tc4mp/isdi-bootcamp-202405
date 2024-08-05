import 'dotenv/config';
import getAllPosts from "./getAllPosts.js";
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs'
const { ObjectId } = Types;


import { expect } from 'chai';
import { User, Post } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('getAllPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI));

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    it('succeeds on existing user listing all posts', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123', following: ['gonzalo'] })
            .then(user =>
                Post.create({ author: new ObjectId().toString(), image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
                    .then(post1 => {
                        Post.create({ author: new ObjectId().toString(), image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
                            .then(post2 => {
                                getAllPosts(user.id)

                                Post.find({}).lean()
                                    .then(posts => {
                                        expect(posts[0].author).to.equal(post1.author)
                                        expect(posts[1].author).to.equal(post2.author)

                                    })
                            })
                    })
            )
    })

    it('fails on non-existing user', () => {
        let _error

        getAllPosts(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('value is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    after(() => mongoose.disconnect());
});