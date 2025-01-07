import 'dotenv/config'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { errors } from '../../com/index.js'
import { expect } from 'chai'
import createEvent from './createEvent.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('createEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on create event', () => {
        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'gon@zalo.com',
            username: 'charlie',
            password: '123123123'
        })
            .then(user =>
                createEvent(
                    user._id.toString(),
                    'title test from cor',
                    'https://randomImage.png',
                    'caption test from cor',
                    new Date(),
                    {
                        type: 'Point',
                        coordinates: [41.3874, 2.1686]
                    },
                    '08:00',
                )
                    .then(() => Event.findOne({ author: user._id }))
                    .then(event => {
                        expect(event).to.not.be.null
                        expect(event.title).to.equal('title test from cor')
                        expect(event.image).to.equal('https://randomImage.png')
                        expect(event.caption).to.equal('caption test from cor')
                        expect(event.date).to.be.instanceOf(Date)
                        expect(event.location.type).to.equal('Point')
                        expect(event.location.coordinates).to.deep.equal([41.3874, 2.1686])
                        expect(event.time).to.equal('08:00')
                    })
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return createEvent(
            new ObjectId().toString(),
            'title test from cor',
            'https://randomImage.png',
            'caption test from cor',
            new Date(),
            {
                type: 'Point',
                coordinates: [41.3874, 2.1686]
            },
            '08:00'
        )
            .catch(error => {
                _error = error
            })
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string image', () => {
        let error

        try {
            createEvent(
                new ObjectId().toString(),
                'title test from cor',
                123,
                'caption test from cor',
                new Date(),
                {
                    type: 'Point',
                    coordinates: [41.3874, 2.1686]
                },
                '21:30'
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on non-string title', () => {
        let error

        try {
            createEvent(
                new ObjectId().toString(),
                123,
                'https://randomImage.png',
                'caption test from cor',
                new Date(),
                {
                    type: 'Point',
                    coordinates: [41.3874, 2.1686]
                },
                '21:30')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('title is not a string')
        }
    })

    it('fails on non-string description', () => {
        let error

        try {
            createEvent(
                new ObjectId().toString(),
                'title test from cor',
                'https://randomImage.png',
                123,
                new Date(),
                {
                    type: 'Point',
                    coordinates: [41.3874, 2.1686]
                },
                '21:30')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('caption is not a string')
        }
    })

    it('fails on non-date', () => {
        let error

        try {
            createEvent(
                new ObjectId().toString(),
                'title test from cor',
                'https://randomImage.png',
                'caption test from cor',
                '',
                {
                    type: 'Point',
                    coordinates: [41.3874, 2.1686]
                },
                '08:00',)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid date')
        }
    })

    it('fails on non-string time', () => {
        let error

        try {
            createEvent(
                new ObjectId().toString(),
                'title test from cor',
                'https://randomImage.png',
                'caption test from cor',
                new Date(),
                {
                    type: 'Point',
                    coordinates: [41.3874, 2.1686]
                },
                2000
            )
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('time is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})