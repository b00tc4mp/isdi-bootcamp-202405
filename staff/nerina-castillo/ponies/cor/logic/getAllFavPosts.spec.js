import 'dotenv/config';
import getAllFavPosts from "./getAllFavPosts.js";
import mongoose, { Types } from 'mongoose';

const { ObjectId } = Types

import { expect } from 'chai';
import { User, Post } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('getAllFavPosts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI));

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));


    it('succeeds on existing user listing all fav posts', () =>
        Post.create({ author: new ObjectId().toString(), image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'i am fine' })
            .then(post =>
                User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123', favs: [post.id] })
                    .then(user => {
                        getAllFavPosts(user.id)
                        User.findOne({ username: 'gonzalo' })
                            .then(user => expect(user.favs).to.include(post.id))
                    })
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return getAllFavPosts(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllFavPosts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })


    afterEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    after(() => mongoose.disconnect());
});

