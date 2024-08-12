import 'dotenv/config'
import toggleFollowUser from "./toggleFollowUser.js";
import mongoose, { Types } from 'mongoose';

import { expect } from 'chai'
import { User } from '../data/models.js';


describe('toggleFollowUser', () => {
    before(done => {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => done())
            .catch(error => done(error));
    });

    beforeEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error));
    });

    it('succeeds on existing user and follow is not toggled', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                User.create({ name: 'julito', surname: 'camelas', email: 'julito@camelas.com', username: 'julitocamelas', password: 'julito123' })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'gonzalo' }).lean()
                                .then(user => {
                                    expect(user.following).to.include('julitocamelas')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('succeeds on existing user and follow is toggled', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                User.create({ name: 'julito', surname: 'camelas', email: 'julito@camelas.com', username: 'julitocamelas', password: 'julito123' })
                    .then(targetUser => {
                        toggleFollowUser(user.username, targetUser.username, error => {
                            if (error) {
                                console.error(error)

                                return
                            }

                            User.findOne({ username: 'gonzalo' }).lean()
                                .then(user => {
                                    expect(user.following).to.not.include('julito')

                                    done()
                                })
                                .catch(error => done(error))
                        })
                    })
                    .catch(error => done(error))
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        toggleFollowUser('gonza', 'julitocamelas', error => {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('user not found');
            done();
        });
    });

    it('fails on non-existing target user', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                toggleFollowUser(user.username, 'juls', error => {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal('target user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-function callback', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                let error;

                try {
                    toggleFollowUser('gonzalo', 'julitocamelas', 123);
                } catch (_error) {
                    error = _error;
                }

                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.equal('callback is not a function');
                done();
            })
            .catch(error => done(error));
    });

    afterEach(done => {
        User.deleteMany()
            .then(() => done())
            .catch(error => done(error));
    });

    after(done => {
        mongoose.disconnect()
            .then(() => done())
            .catch(error => done(error));
    });
});