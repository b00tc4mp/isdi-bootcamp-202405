import 'dotenv/config'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { errors } from 'com'
import { expect } from 'chai'
import createReview from './createReview.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('createReview', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    let user, event

    beforeEach(() => {
        return Promise.all([User.deleteMany(), Event.deleteMany()])
            .then(() => User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'lamary',
                password: '123123123',
                avatar: '/avatar/avatarIcon.png',
                going: []
            }))
            .then(_user => {
                user = _user

                return Event.create({
                    author: user._id,
                    title: 'Test Event',
                    image: 'image.png',
                    date: new Date(),
                    location: {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    time: '18:00'
                })
            })
            .then(_event => {
                event = _event
                return User.findByIdAndUpdate(user._id, { going: [event._id] })
            })
    })

    it('succeeds on create review', () => {
        return createReview(user._id.toString(), event._id.toString(), 5, 'test review from cor')
            .then(_event => {
                expect(_event.reviews).to.have.lengthOf(1)
                expect(_event.reviews[0].rating).to.equal(5)
                expect(_event.reviews[0].comment).to.equal('test review from cor')
                expect(_event.reviews[0].author.toString()).to.equal(user._id.toString())
            })
    })

    it('fails on user did not attend the event', () => {
        return createReview(user._id.toString(), new ObjectId().toString(), 4, 'Good event')
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('event not found')
            })
    })

    it('fails on invalid userId', () => {
        return createReview(new ObjectId().toString(), event._id.toString(), 5, 'test review')
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on invalid eventId', () => {
        return createReview(user._id.toString(), new ObjectId().toString(), 5, 'test review')
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('event not found')
            })
    })

    it('fails on non-string user', () => {
        let error

        try {
            createReview(123, event._id.toString(), 1, 'test review')

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string event', () => {
        let error

        try {
            createReview(user._id.toString(), 123, 1, 'test review')

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('eventId is not a string')
        }
    })

    it('fails on invalid rating', () => {
        let error

        try {
            createReview(user._id.toString(), event._id.toString(), 'e', 'test review')

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('rating is not a number')
        }
    })

    it('fails on non-string comment', () => {
        let error

        try {
            createReview(user._id.toString(), event._id.toString(), 1, 123)

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('comment is not a string')
        }
    })

    it('fails on system error during user retrieval', () => {
        return User.findByIdAndDelete(user._id)
            .then(() => createReview(user._id.toString(), event._id.toString(), 5, 'test review'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on system error during event retrieval', () => {
        return Event.findByIdAndDelete(event._id)
            .then(() => createReview(user._id.toString(), event._id.toString(), 5, 'test review'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('event not found')
            })
    })

    it('fails on empty comment', () => {
        let error

        try {
            createReview(user._id.toString(), event._id.toString(), 1, '')

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('comment is empty')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})