import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'
import errors from '../../com/errors.js'
import deleteEvent from './deleteEvent.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError, OwnershipError } = errors

describe('deleteEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on delete event', () => {
        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user =>
                Event.create({ author: user.id, image: 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', title: 'Barrenfields', description: 'Barrenfields concert', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), startTime: '21.30', tickets: 'http://crocantickets.com' })
                    .then(event1 =>
                        Event.create({ author: user.id, image: null, title: 'luissss', description: 'Luis Aragofest', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), endDate: new Date(), startTime: '21.30', tickets: 'http://crocantickets.com' })
                            .then(event2 => deleteEvent(user.id, event1.id)
                                .then(() => Event.find({}).lean())
                                .then(events => {
                                    expect(events).to.have.lengthOf(1)
                                    expect(events[0].author.toString()).to.equal(event2.author.toString())
                                })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return Event.create({ author: new ObjectId().toString(), image: null, title: 'luissss', description: 'Luis Aragofest', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), startTime: '21.30', tickets: 'http://lrejb' })
            .then(event =>
                deleteEvent(new ObjectId().toString(), event.id)
                    .catch(error => _error = error)
            )
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing event', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => deleteEvent(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceof(NotFoundError)
                expect(_error.message).to.equal('event not found')
            })
    })

    it('fails on existing user and event does not belong to user', () => {
        let _error

        return User.create({ name: 'gon', username: 'gonzalo', role: 'user', email: 'gon@zalo.com', password: 'gonzalo123' })
            .then(user => {
                return Event.create({ author: new ObjectId().toString(), image: null, title: 'luissss', description: 'Luis Aragofest', location: { type: 'Point', coordinates: [40.7128, -74.0060] }, startDate: new Date(), startTime: '21.30', tickets: 'http://lrejb' })
                    .then(event => deleteEvent(user.id, event.id))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(OwnershipError)
                        expect(_error.message).to.equal('event does not belong to user')
                    })
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            deleteEvent(123, 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Barrenfields concert', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), new Date())
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
            deleteEvent(new ObjectId().toString(), 123)
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