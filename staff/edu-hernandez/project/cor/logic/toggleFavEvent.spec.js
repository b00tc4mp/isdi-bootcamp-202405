import 'dotenv/config'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'

import toggleFavEvent from './toggleFavEvent.js'

const { ObjectId } = Types
const { NotFoundError } = errors

describe('toggleFavEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany().then(() => Event.deleteMany()))

    it('succeeds on existing user and event has no favorites', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            fav: []
        })
            .then(user =>
                Event.create({
                    author: user.id,
                    title: 'test event',
                    image: 'https://randomImage.png',
                    caption: 'test caption',
                    location: {
                        type: 'Point',
                        coordinates: [41.38879, 2.15899]
                    },
                    time: '08:00',
                    likes: []
                })
                    .then(event =>
                        toggleFavEvent(user.id, event.id)
                            .then(() => User.findById(user.id).lean())
                            .then(updatedUser => {
                                expect(updatedUser.fav.map(eventObjectId =>
                                    eventObjectId.toString())).to.include(event.id)
                            })
                    )
            )
    )

    it('succeeds on existing user and event is already favorite', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            fav: []
        })
            .then(user =>
                Event.create({
                    author: user.id,
                    title: 'test event',
                    image: 'https://randomImage.png',
                    caption: 'test caption',
                    location: {
                        type: 'Point',
                        coordinates: [41.38879, 2.15899]
                    },
                    time: '08:00',
                    likes: [],
                    fav: [user.id]
                })
                    .then(event =>
                        toggleFavEvent(user.id, event.id)
                            .then(() => User.findById(user.id).lean())
                            .then(updatedUser => {
                                expect(updatedUser.fav.map(eventObjectId =>
                                    eventObjectId)).to.not.include(event.id)
                            })
                    )
            )
    )

    it('succeeds on removing an event from user favs', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            fav: []
        })
            .then(user =>
                Event.create({
                    author: user.id,
                    title: 'test event',
                    image: 'https://randomImage.png',
                    caption: 'test caption',
                    location: {
                        type: 'Point',
                        coordinates: [41.38879, 2.15899]
                    },
                    time: '08:00',
                    likes: []
                })
                    .then(event => {
                        user.fav.push(event.id)
                        return user.save()
                            .then(() =>
                                toggleFavEvent(user.id, event.id)
                            )
                            .then(() => Promise.all([
                                User.findById(user.id).lean(),
                                Event.findById(event.id).lean()
                            ]))
                            .then(([updatedUser, updatedEvent]) => {
                                expect(updatedUser.fav.map(eventObjectId =>
                                    eventObjectId.toString())).to.not.include(event.id)
                            })
                    })
            )
    )

    it('fails on invalid userId format', () => {
        let _error

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            fav: []
        })
            .then(user =>
                Event.create({
                    author: user.id,
                    title: 'test event',
                    image: 'https://randomImage.png',
                    caption: 'test caption',
                    location: {
                        type: 'Point',
                        coordinates: [41.38879, 2.15899]
                    },
                    time: '08:00',
                })
            )
            .then(event => toggleFavEvent(new ObjectId().toString(), event.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.exist
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on invalid eventId format', () => {
        let _error

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            fav: []
        })
            .then(user => toggleFavEvent(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.exist
                expect(_error.message).to.equal('event not found')
            })
    })

    it('fails on non-existing user', () => {
        let _error

        const userObjectId = new ObjectId

        return Event.create({
            author: userObjectId,
            title: 'test event',
            image: 'https://randomImage.png',
            caption: 'test caption',
            location: {
                type: 'Point',
                coordinates: [41.38879, 2.15899]
            },
            time: '08:00',
        })
            .then(event => toggleFavEvent(new ObjectId().toString(), event.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing event', () => {
        let _error

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            fav: []
        })
            .then(user => toggleFavEvent(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('event not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})
