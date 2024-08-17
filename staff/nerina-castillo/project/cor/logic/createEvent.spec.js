import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'

import createEvent from './createEvent.js'
import { errors } from '../../com/index.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError } = errors

describe('createEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Event.deleteMany()])
    )

    it('succeeds on create event', () => {
        User.create({ name: 'gon', surname: 'zalo', email: 'gon@zalo.com', username: 'gonzalo', password: 'hashedpassword' })
            .then(user => {
                createEvent(user._id.toString(), 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Barrenfields concert', 'Concer of Barrenfields and Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '21:30', 'https://crocantickets.com')
            })
            .then(() => Event.findOne({ author: user._id }))
            .then(event => {
                expect(event).to.not.be.null
                expect(event.image).to.equal('https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver')
                expect(event.title).to.equal('Concert of Barrenfiels and Oxido')
                expect(event.description).to.equal('Barrenfields concert')
                expect(event.location).to.equal({ type: 'Point', coordinates: [40.7128, -74.0060] })
                expect(event.startDate).to.equal(new Date())
                expect(event.startTime).to.equal('21:30')
                expect(event.tickets).to.equal('https://crocantickets.com')
            })
    })

    it('fails on non-existing user', () => {
        let _error;

        return createEvent(new ObjectId().toString(), 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Barrenfields concert', 'Concer of Barrenfields and Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '21:30', 'https://crocantickets.com')
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
            createEvent(new ObjectId().toString(), 123, 'Barrenfields concert', 'Concer of Barrenfields and Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '21:30', 'https://crocantickets.com')
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
            createEvent(new ObjectId().toString(), 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 123, 'Concer of Barrenfields and Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '21:30', 'https://crocantickets.com')
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
            createEvent(new ObjectId().toString(), 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Barrenfields', 123, { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '21:30', 'https://crocantickets.com')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('description is not a string')
        }
    })

    it('fails on non-date startDate', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Barrenfields', 'Concer of Barrenfields and Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, 'new Date()', '21:30', 'https://crocantickets.com')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid startDate')
        }
    })

    it('fails on non-string startTime', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Barrenfields', 'Concer of Barrenfields and Oxido', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), 2130, 'https://crocantickets.com')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('startTime is not a string')
        }
    })

    it('fails on non-string tickets', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver', 'Barrenfields', 'Concert of Barrenfields', { type: 'Point', coordinates: [40.7128, -74.0060] }, new Date(), '21:30', '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid tickets')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})