import 'dotenv/config'
import toggleFollowUser from "./toggleFollowUser.js";
import mongoose, { Types } from 'mongoose';

import { expect } from 'chai'
import { User } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors


describe('toggleFollowUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI));

    beforeEach(() => Promise.all([User.deleteMany()]));

    it('succeeds on existing user and follow is not toggled', () =>
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user =>
                User.create({ name: 'julito', surname: 'camelas', email: 'julito@camelas.com', username: 'julitocamelas', password: 'julito123' })
                    .then(targetUser =>
                        toggleFollowUser(user.username, targetUser.username)
                            .then(() => User.findOne({ username: 'gonzalo' }).lean())
                            .then(user => {
                                expect(user.following).to.be.an('array');
                                expect(user.following).to.include('julitocamelas');
                            })
                    )
            )
    );

    it('succeeds on existing user and follow is toggled', () =>
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user =>
                User.create({ name: 'julito', surname: 'camelas', email: 'julito@camelas.com', username: 'julitocamelas', password: 'julito123' })
                    .then(targetUser =>
                        toggleFollowUser(user.username, targetUser.username)
                            .then(() => toggleFollowUser(user.username, targetUser.username)) // Toggle again
                            .then(() => User.findOne({ username: 'gonzalo' }).lean())
                            .then(user => {
                                expect(user.following).to.be.an('array');
                                expect(user.following).to.not.include('julitocamelas');
                            })
                    )
            )
    );

    it('fails on non-existing user', () => {
        let _error;

        return toggleFollowUser('nonexistent', 'julitocamelas')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError);
                expect(_error.message).to.equal('user not found');
            });
    });

    it('fails on existing user but non-existing targetUser', () => {
        let _error;

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => toggleFollowUser('gonzalo', 'nonexistent'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError);
                expect(_error.message).to.equal('targetUser not found');
            });
    });

    it('fails on non-string username', () => {
        let error;

        try {
            toggleFollowUser(123, 'julitocamelas');
        } catch (_error) {
            error = _error;
        } finally {
            expect(error).to.be.instanceOf(ValidationError);
            expect(error.message).to.equal('username is not a string');
        }
    });


    it('fails on non-string targetUsername', () => {
        let error;

        try {
            toggleFollowUser('gonzalo', 123);
        } catch (_error) {
            error = _error;
        } finally {
            expect(error).to.be.instanceOf(ValidationError);
            expect(error.message).to.equal('targetUsername is not a string');
        }
    });

    afterEach(() => Promise.all([User.deleteMany()]));

    after(() => mongoose.disconnect());
});