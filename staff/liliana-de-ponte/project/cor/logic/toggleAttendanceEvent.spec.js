import 'dotenv/config'
import toggleAttendeeEvent from './toggleAttendeeEvent.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Event } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError } = errors

describe('toggleAttendeeEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() =>
        Promise.all([User.deleteMany(), Event.deleteMany()])
    )

    it('succeeds on existing user and event has no attendee', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user =>
                Event.create({ author: user.id, title: 'TRT', organizer: 'Sergio Canovas', date: 2024 / 9 / 17, duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] } })
                    .then(event =>
                        toggleAttendeeEvent(user.id, event.id)
                            .then(() => Event.findById(event.id).lean())
                            .then(event => expect(event.attendees.map(userObjectId => userObjectId.toString())).to.include(user.id))
                    )
            )
    )

    it('succeeds on existing user and event has attendee', () =>
        User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user =>
                Event.create({ author: user.id, title: 'TRT', organizer: 'Sergio Canovas', date: 2024 / 9 / 17, duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, attendees: [user.id] })
                    .then(event =>
                        toggleAttendeeEvent(user.id, event.id)
                            .then(() => Event.findById(event.id).lean())
                            .then(event => expect(event.attendees).to.not.include(user.username))
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Event.create({ author: new ObjectId().toString(), title: 'TRT', organizer: 'Sergio Canovas', date: 2024 / 9 / 17, duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] } })
            .then(event => toggleAttendeeEvent(new ObjectId().toString(), event.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')

            })
    })

    it('fails on existing user but non-existing event', () => {
        let _error

        return User.create({ name: 'Samu', surname: 'Spine', email: 'samu@spine.com', username: 'samuspine', password: '123456789' })
            .then(user => toggleAttendeeEvent(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('event not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            toggleAttendeeEvent(123, new ObjectId().toString())
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
            toggleAttendeeEvent(new ObjectId().toString(), 123)
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

