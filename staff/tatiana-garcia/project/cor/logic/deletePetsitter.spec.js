import 'dotenv/config'

import deletePetsitter from './deletePetsitter.js'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Petsitter } from '../data/models.js'

import { errors } from '../../com/index.js'

const { NotFoundError, ValidationError, OwnerShipError } = errors

describe('deletePetsitter', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Petsitter.deleteMany()]))

    it('succeds on delete petssiter', () => {
        User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user =>
                Petsitter.create({ author: user.id, image: 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', petsitterName: 'Els Altres', city: 'Barcelona', description: 'Porfavor funcioname, no pido mas', pets: ['conejos', 'cobayas'] })
                    .then(petsitter => {
                        deletePetsitter(user.id, petsitter.id)

                            .then(() => {
                                petsitter.findById(petsitter.id)
                                    .then(_petsitter => {
                                        expect(_petsitter).to.be.null
                                    })
                            })
                    })
            )
    })


    it('fails on non-existing user', () => {
        let _error

        return Petsitter.create({ author: new ObjectId().toString(), image: 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', petsitterName: 'Els Altres', city: 'Barcelona', description: 'Porfavor funcioname, no pido mas', pets: ['conejos', 'cobayas'] })
            .then(petsitter => deletePetsitter(new ObjectId().toString(), petsitter.id))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing petsitter', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => deletePetsitter(user.id, new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('petsitter not found')
            })
    })

    it('fails on existing user and petsitter but petsitter does not belog to user', () => {
        let _error

        return User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123' })
            .then(user => {
                Petsitter.create({ author: new ObjectId(), image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', caption: 'wtf' })
                    .then(petsitter => deletePetsitter(user.id, petsitter.id))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(OwnerShipError)
                        expect(_error.message).to.equal('petsitter does not belong to user')
                    })
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            deletePetsitter(123, new ObjectId().toString())
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string petsitterId', () => {
        let error

        try {
            deletePetsitter(new ObjectId().toString(), 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('petsitterId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Petsitter.deleteMany()]))

    after(() => mongoose.disconnect())
})