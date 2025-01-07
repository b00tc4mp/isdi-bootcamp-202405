import 'dotenv/config'
import { User, Event } from '../data/models.js'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { errors } from 'com'

import toggleGoingEvent from './toggleGoingEvent.js'

const { ObjectId } = Types
const { NotFoundError } = errors

describe('toggleGoingEvent', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => User.deleteMany().then(() => Event.deleteMany()))

    it('succeeds on existing user and event has no going events', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
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
                        toggleGoingEvent(user.id, event.id)
                            .then(() => Promise.all([
                                User.findById(user.id).lean(),
                                Event.findById(event.id).lean()
                            ]))
                            .then(([updatedUser, updatedEvent]) => {
                                expect(updatedUser.going.map(eventObjectId => eventObjectId.toString())).to.include(event.id)
                                expect(updatedEvent.going.map(userObjectId => userObjectId.toString())).to.not.include(user.id)
                            })
                    )
            )
    )

    it('succeeds on existing user and event has going events', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
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
                    going: [user.id]
                })
                    .then(event =>
                        toggleGoingEvent(user.id, event.id)
                            .then(() => Promise.all([
                                User.findById(user.id).lean(),
                                Event.findById(event.id).lean()
                            ]))
                            .then(([updatedUser, updatedEvent]) => {
                                expect(updatedUser.going.map(eventObjectId => eventObjectId.toString())).to.include(event.id)
                                expect(updatedEvent.going.map(userObjectId => userObjectId.toString())).to.include(user.id)
                            })
                    )
            )
    )

    it('succeeds on event with multiple going users', () =>
        User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
        })
            .then(user1 =>
                User.create({
                    name: 'Snoopy',
                    surname: 'Dog',
                    role: 'user',
                    email: 'snoopy@dog.com',
                    username: 'snoopy',
                    password: '123123123'
                })
                    .then(user2 =>
                        Event.create({
                            author: user1.id,
                            title: 'test event',
                            image: 'https://randomImage.png',
                            caption: 'test caption',
                            location: {
                                type: 'Point',
                                coordinates: [41.38879, 2.15899]
                            },
                            time: '08:00',
                            going: []
                        })
                            .then(event =>
                                toggleGoingEvent(user1.id, event.id)
                                    .then(() => Promise.all([
                                        User.findById(user1.id).lean(),
                                        Event.findById(event.id).lean()
                                    ]))
                                    .then(([updatedUser, updatedEvent]) => {
                                        expect(updatedUser.going.map(eventObjectId => eventObjectId.toString())).to.include(event.id)
                                        expect(updatedEvent.going.map(userObjectId => userObjectId.toString())).to.not.include(user1.id)
                                        expect(updatedEvent.going.map(userObjectId => userObjectId.toString())).to.not.include(user2.id)
                                    })
                            )
                    )
            )
    )

    it('succeeds on removes user and event from both going lists', () => {
        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123',
            going: []
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
                    going: []
                })
                    .then(event =>
                        toggleGoingEvent(user.id, event.id)
                            .then(() => Promise.all([
                                User.findById(user.id).lean(),
                                Event.findById(event.id).lean()
                            ]))
                            .then(([updatedUser, updatedEvent]) => {
                                expect(updatedEvent.going.map(userObjectId => userObjectId.toString())).to.not.include(user.id)
                                expect(updatedUser.going.map(eventObjectId => eventObjectId.toString())).to.include(event.id)

                                return toggleGoingEvent(user.id, event.id)
                                    .then(() => Promise.all([
                                        User.findById(user.id).lean(),
                                        Event.findById(event.id).lean()
                                    ]))
                                    .then(([finalUser, finalEvent]) => {
                                        expect(finalEvent.going).to.be.empty
                                        expect(finalUser.going).to.be.empty
                                    })
                            })
                    )
            )
    })

    it('removes event from event.going but not from user.going', () => {
        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
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
                    going: []
                })
                    .then(event =>
                        toggleGoingEvent(user.id, event.id)
                            .then(() => Promise.all([
                                User.findById(user.id).lean(),
                                Event.findById(event.id).lean()
                            ]))
                            .then(([updatedUser, updatedEvent]) => {
                                expect(updatedEvent.going.map(userObjectId => userObjectId.toString())).to.not.include(user.id)
                                expect(updatedUser.going.map(eventObjectId => eventObjectId.toString())).to.include(event.id)
                            })
                    )
            )
    })

    it('fails on invalid userId format', () => {
        let _error

        return User.create({
            name: 'Charlie',
            surname: 'Brown',
            role: 'user',
            email: 'charlie@brown.com',
            username: 'charlie',
            password: '123123123'
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
            .then(event => toggleGoingEvent(new ObjectId().toString(), event.id))
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
            password: '123123123'
        })
            .then(user => toggleGoingEvent(user.id, new ObjectId().toString()))
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
            title: 'test from cor',
            image: 'https://randomImage.png',
            caption: 'test from cor',
            location: {
                type: 'Point',
                coordinates: [41.38879, 2.15899]
            },
            time: '08:00',
        })
            .then(event => toggleGoingEvent(new ObjectId().toString(), event.id))
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
            password: '123123123'
        })
            .then(user => toggleGoingEvent(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('event not found')
            })
    })

    afterEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

    after(() => mongoose.disconnect())
})