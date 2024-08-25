import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'
import { errors } from '../../com/index.js'
import updateEventData from './updateEventData.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError, OwnershipError } = errors

describe('updateEventData', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on existing user and event', () => {
        let userId, eventId

        return User.create({ name: 'gon', username: 'gonzalo', email: 'gon@zalo.com', role: 'user', password: 'gonzalo123' })
            .then(user => {
                userId = user.id;
                return Event.create({
                    author: userId,
                    image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver',
                    description: 'Barrenfields concert',
                    location: { type: 'Point', coordinates: [40.7128, -74.0060] },
                    startDate: new Date(),
                    endDate: new Date(),
                    startTime: '18:00',
                    title: 'Barrenfields Live'
                });
            })
            .then(event => {
                eventId = event.id
                return updateEventData(
                    userId,
                    eventId,
                    'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver',
                    'Luis Aragofest Title',
                    'Luis Aragofest',
                    { type: 'Point', coordinates: [41.7128, -75.0060] },
                    new Date(),
                    '19:00',
                    'https://tickets.example.com'
                );
            })
            .then(() => Event.findById(eventId).lean())
            .then(event => {
                expect(event.description).to.equal('Luis Aragofest')
                expect(event.location.coordinates).to.deep.equal([41.7128, -75.0060])
                expect(event.startTime).to.equal('19:00')
                expect(event.title).to.equal('Luis Aragofest Title')
            })
    })

    it('fails on non-existing user', () => {
        let error

        return Event.create({
            author: new ObjectId().toString(),
            description: 'Barrenfields concert',
            location: { type: 'Point', coordinates: [40.7128, -74.0060] },
            startDate: new Date(),
            endDate: new Date(),
            startTime: '18:00',
            title: 'Barrenfields Live'
        })
            .then(event => {
                return updateEventData(
                    new ObjectId().toString(),
                    event._id.toString(),
                    'https://example.com/image.png',
                    'Luis Aragofest Title',
                    'Luis Aragofest',
                    { type: 'Point', coordinates: [41.7128, -75.0060] },
                    new Date(),
                    '19:00',
                    'https://tickets.example.com'
                );
            })
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing event', () => {
        let error

        return User.create({
            name: 'gon',
            username: 'gonzalo',
            role: 'user',
            email: 'gon@zalo.com',
            password: 'gonzalo123'
        })
            .then(user => {
                return updateEventData(
                    user.id,
                    new ObjectId().toString(),
                    'https://example.com/image.png',
                    'Luis Aragofest Title',
                    'Luis Aragofest',
                    { type: 'Point', coordinates: [41.7128, -75.0060] },
                    new Date(),
                    '19:00',
                    'https://tickets.example.com'
                );
            })
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('event not found')
            })
    })

    it('fails on existing user and event but event does not belong to user', () => {
        let error

        return User.create({
            name: 'gon',
            username: 'gonzalo',
            role: 'user',
            email: 'gon@zalo.com',
            password: 'gonzalo123'
        })
            .then(user => {
                return Event.create({
                    author: new ObjectId().toString(),
                    description: 'Barrenfields concert',
                    location: { type: 'Point', coordinates: [40.7128, -74.0060] },
                    startDate: new Date(),
                    endDate: new Date(),
                    startTime: '18:00',
                    title: 'Barrenfields Live'
                })
                    .then(event => {
                        return updateEventData(
                            user.id,
                            event.id,
                            'https://example.com/image.png',
                            'Luis Aragofest Title',
                            'Luis Aragofest',
                            { type: 'Point', coordinates: [41.7128, -75.0060] },
                            new Date(),
                            '19:00',
                            'https://tickets.example.com'
                        );
                    })
                    .catch(_error => error = _error)
            })
            .finally(() => {
                expect(error).to.be.instanceOf(OwnershipError)
                expect(error.message).to.equal('event does not belong to user')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateEventData(123, 'eventId', { description: 'Barrenfields concert', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), endDate: new Date() })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string eventId', () => {
        let error

        try {
            updateEventData(new ObjectId().toString(), 123, { description: 'Barrenfields concert', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), endDate: new Date() })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('eventId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})