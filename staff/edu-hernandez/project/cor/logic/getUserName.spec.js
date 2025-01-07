import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/models.js'
import { errors } from 'com'
import getUserName from './getUserName.js'

const { ObjectId } = Types
const { NotFoundError, SystemError, ValidationError } = errors

describe('getUserName', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))
    let user, targetUser

    beforeEach(() => {
        return Promise.all([User.deleteMany()])
            .then(() => {
                return User.create({
                    name: 'Charlie',
                    surname: 'Brown',
                    role: 'user',
                    email: 'charlie@brown.com',
                    username: 'charlie',
                    password: '123123123',
                })
            })
            .then(_user => {
                user = _user
                return User.create({
                    name: 'Mary',
                    surname: 'Jane',
                    role: 'user',
                    email: 'jane@example.com',
                    username: 'janedoe',
                    password: '123123123',
                })
            })
            .then(_targetUser => targetUser = _targetUser)
    })

    it('succeeds on valid user and targetUser', () => {
        return getUserName(user._id.toString(), targetUser._id.toString())
            .then(name => {
                expect(name).to.exist
                expect(name).to.equal(targetUser.name)
            })
    })

    it('fails when userId is invalid', () => {
        return getUserName(new ObjectId().toString(), targetUser._id.toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails when targetUserId is invalid', () => {
        return getUserName(user._id.toString(), new ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('target user not found')
            })
    })

    it('fails when user not found', () => {
        return getUserName(new ObjectId().toString(), targetUser._id.toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails when target user not found', () => {
        return getUserName(user._id.toString(), new ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('target user not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany()]))
    after(() => mongoose.disconnect())
})
