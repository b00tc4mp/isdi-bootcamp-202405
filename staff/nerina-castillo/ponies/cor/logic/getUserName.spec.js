import 'dotenv/config'
import getUserName from "./getUserName.js";
import mongoose, { Types } from 'mongoose';

import { expect } from 'chai'
import { User } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors


describe('getUserName', () => {
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

    it('succeeds on existing user and targetUser', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                getUserName('gonzalo', 'gonzalo', error => {
                    expect(user.name).to.equal('gon')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-existing user', done => {
        getUserName('gonza', 'julitocamelas', error => {
            expect(error).to.be.instanceOf(NotFoundError);
            expect(error.message).to.equal('user not found');
            done();
        });
    });

    it('fails on non-existing target user', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => {
                getUserName(user.username, 'julitocamelas', error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal('target user not found')

                    done()
                })
            })
            .catch(error => done(error))
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserName(123, 'gonzalo123', error => { })
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
            getUserName('gon', 'julitocamelas', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on invalid target username', () => {
        let error

        try {
            getUserName('gon', '', error => { })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    it('fails on non-function callback', done => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(() => {
                let error;

                try {
                    getUserName('gonzalo', 'julitocamelas', 123);
                } catch (_error) {
                    error = _error;
                }

                expect(error).to.be.instanceOf(ValidationError);
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