import 'dotenv/config'
import getUserName from "./getUserName.js";
import mongoose from 'mongoose';

import { expect } from 'chai'
import { User } from '../data/models.js';

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors


describe('getUserName', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user and targetUser', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => getUserName('gonzalo', 'gonzalo'))
            .then(() => expect(user.name).to.equal('gon'))


    })

    it('fails on non-existing user', () => {
        let _error

        return getUserName('gonza', 'julitocamelas')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError);
                expect(_error.message).to.equal('user not found');
            })

    });

    it('fails on non-existing target user', () => {
        let _error

        return User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'gonzalo123' })
            .then(user => getUserName(user.username, 'julitocamelas'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('target user not found')
            })
    })

    it('fails on non-string username', () => {
        let error

        try {
            getUserName(123, 'gonzalo123')
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
            getUserName('gon', 'julitocamelas')
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
            getUserName('gon', '')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid username')
        }
    })

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
});