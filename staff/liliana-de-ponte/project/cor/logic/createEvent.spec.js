import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import createEvent from './createEvent.js'
import { User, Event } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('createEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    it('succeds on new event', () => {
        User.create({ name: 'Lili', surname: 'De Ponte', email: 'lili@deponte.com', username: 'lilideponte', password: '123456789' })
            .then(user => {
                createEvent(user.id, 'TRT', 'Sergio Canovas', new Date(2024 / 9 / 17), '3 dias', 'un evento sobre ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })
            })
            .then(() => Event.findOne({ author: user.id }))
            .then(event => {
                expect(event.author.toString()).to.equal(user.id)
                expect(event.title).to.equal('TRT')
                expect(event.organizer).to.equal('Sergio Canovas')
                expect(event.date).to.equal(new Date(2024 / 9 / 17))
                expect(event.duration).to.equal('3 días')
                expect(event.description).to.equal('un evento sobre ....')
                expect(event.image).to.equal('https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                expect(event.location).to.equal({ type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })

            })
    })


    it('fails on non-existing user', () => {
        let _error

        return createEvent(new ObjectId().toString(), 'TRT', 'Sergio Canovas', new Date(2024 / 9 / 17), '3 dias', 'un evento sobre ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createEvent(123, 'TRT', 'Sergio Canovas', new Date(2024 / 9 / 17), '3 dias', 'un evento sobre ....', 'https://media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string title', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 123, 'Sergio Canovas', new Date(2024 / 9 / 17), '3 dias', 'un evento sobre ....', 1234, { Type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('title is not a string')
        }
    })

    // fails date

    it('fails on non-string organizer', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'TRT', 123, new Date(2024 / 9 / 17), '3 dias', 'un evento sobre ....', 1234, { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('organizer is not a string')
        }
    })

    it('fails on non-string duration', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'TRT', 'Sergio Canovas', new Date(2024 / 9 / 17), 123, 'un evento sobre ....', 1234, { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('duration is not a string')
        }
    })

    it('fails on non-string description', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'TRT', 'Sergio Canovas', new Date(2024 / 9 / 17), '3 dias', 1233, 1234, { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('description is not a string')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'TRT', 'Sergio Canovas', new Date(2024 / 9 / 17), '3 dias', 'un evento sobre ....', 1234, { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid url non-startWith http', () => {
        let error

        try {
            createEvent(new ObjectId().toString(), 'TRT', 'Sergio Canovas', new Date(2024 / 9 / 17), '3 dias', 'un evento sobre ....', '//media.giphy.com/media/kYNVwkyB3jkauFJrZA/giphy.gif?cid=790b7611dhp6zc5g5g7wpha1e18yh2o2f65du1ribihl6q9i&ep=v1_gifs_trending&rid=giphy.gif&ct=g', { type: 'Point', coordinates: [41.37946397948531, 2.1521122255990233] })

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())

})