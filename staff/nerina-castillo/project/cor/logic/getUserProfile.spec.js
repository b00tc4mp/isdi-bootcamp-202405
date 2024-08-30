import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import { errors } from '../../com/index.js'
import getUserProfile from './getUserProfile.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('getUserProfile', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123', avatar: './gon.png' })
            .then(user => {
                return getUserProfile(user._id.toString()).then(userProfile => {
                    expect(userProfile).to.have.property('id')
                    expect(userProfile.id).to.equal(user._id.toString())
                    expect(userProfile.username).to.equal('gonzalo')
                    expect(userProfile.avatar).to.equal('./gon.png')
                    expect(userProfile.posts).to.be.an('array')
                })
            })
    })

    it('fails on non-existing user', () => {
        let _error

        return getUserProfile(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let _error;

        return getUserProfile('')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(ValidationError);
                expect(_error.message).to.equal('userId is not a string');
            });
    });

    it('fails on non-string userId', () => {
        let _error;

        return getUserProfile(123)
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(ValidationError);
                expect(_error.message).to.equal('userId is not a string');
            });
    });

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect())
})