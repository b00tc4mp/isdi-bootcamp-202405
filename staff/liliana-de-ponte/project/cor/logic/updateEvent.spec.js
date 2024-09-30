import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Event } from '../data/models.js'
import { errors } from '../../com/index.js'
import updateEvent from './updateEvent.js'

const { ObjectId } = Types
const { NotFoundError, ValidationError, OwnershipError } = errors

describe('updateEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeeds on existing user and event', () => {
        let userId, eventId

        return User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(user => {
                userId = user.id
                return Event.create({ author: user.id, title: 'TRT', organizer: 'Sergio Canovas', date: new Date(), duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: 'diputacion 37', city: 'Barcelona' })
            })
            .then(event => {
                eventId = event.id
                return updateEvent(userId, eventId, 'Tu Riqueza eres TU', 'Sergio Canovas', new Date(), '2 dias', 'trata de ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, 'diputacion 37', 'Barcelona')
            })
            .then(() => Event.findById(eventId).lean())
            .then(event => {
                expect(event.title).to.equal('Tu Riqueza eres TU')
                expect(event.description).to.equal('trata de ....')
                expect(event.duration).to.equal('2 dias')
                expect(event.location.coordinates).to.deep.equal([41.37946397948531, 2.1521122255990233])
            })

    })

    it('fails on non-existing user', () => {
        let error
        return Event.create({ author: new ObjectId().toString(), title: 'TRT', organizer: 'Sergio Canovas', date: 2024 / 9 / 17, duration: '3 dias', description: 'un evento sobre ....', image: 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, address: 'diputacion 37', city: 'Barcelona' })
            .then(event => {
                return updateEvent(new ObjectId().toString(), event._id.toString(), 'Tu Riqueza eres TU', 'Sergio Canovas', new Date(), '2 dias', 'trata de ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, 'diputacion 37', 'Barcelona')
            })
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing event', () => {
        let error
        return User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(user => {
                return updateEvent(user.id, new ObjectId().toString(), 'Tu Riqueza eres TU', 'Sergio Canovas', new Date(), '2 dias', 'trata de ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, 'diputacion 37', 'Barcelona')
            })
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('event not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateEvent(123, 'eventId', 'Tu Riqueza eres TU', 'Sergio Canovas', new Date(), '2 dias', 'trata de ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, 'diputacion 37', 'Barcelona')
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
            updateEvent(new ObjectId().toString(), 123, 'Tu Riqueza eres TU', 'Sergio Canovas', new Date(), '2 dias', 'trata de ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] }, 'diputacion 37', 'Barcelona')
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