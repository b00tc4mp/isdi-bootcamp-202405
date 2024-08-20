import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import createPetsitter from './createPetsitter.js'
import { User, Petsitter } from '../data/models.js'

import { errors } from '../../com/index.js'

const { ValidationError, NotFoundError } = errors

describe('createPetsitter', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Petsitter.deleteMany()]))

    it('succeds on new petssiter', () => {
        User.create({ image: 'https://www.ngenespanol.com/', name: 'Tatiana', surname: 'Garcia', email: 'tati@garcia.com', username: 'tatig', password: '123123123', passwordRepeat: '123123123' })
            .then(user => {
                createPetsitter(user.id, 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'Els Altres', 'Barcelona', 'Porfavor funcioname, no pido mas', ['conejos', 'cobayas'])
            })
            .then(() => Petsitter.findOne({ author: user.id }))
            .then(petsitter => {
                expect(petsitter.author.toString()).to.equal(user.id)
                expect(petsitter.image).to.equal('https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180')
                expect(petsitter.petsitterName).to.equal('Els Altres')
                expect(petsitter.city).to.equal('Barcelona')
                expect(petsitter.description).to.equal('Porfavor funcioname, no pido mas')
                expect(petsitter.pets).to.equal(['conejos', 'cobayas'])

            })
    })


    it('fails on non-existing user', () => {
        let _error

        return createPetsitter(new ObjectId().toString(), 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'Els Altres', 'Barcelona', 'Porfavor funcioname, no pido mas', ['conejos', 'cobayas'])
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createPetsitter(123, 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'Els Altres', 'Barcelona', 'Porfavor funcioname, no pido mas', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createPetsitter(new ObjectId().toString(), 123, 'Els Altres', 'Barcelona', 'Porfavor funcioname, no pido mas', ['conejos', 'cobayas'])

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on non-string description', () => {
        let error

        try {
            createPetsitter(new ObjectId().toString(), 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'Els Altres', 'Barcelona', 123, ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('description is not a string')
        }
    })

    it('fails on invalid url non-startWith http', () => {
        let error

        try {
            createPetsitter(new ObjectId().toString(), 'jhasgfjgh', 'Els Altres', 'Barcelona', 'Porfavor funcioname, no pido mas', ['conejos', 'cobayas'])

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    it('fails on non-selected any pets', () => {
        let error

        try {
            createPetsitter(new ObjectId().toString(), 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'Els Altres', 'Barcelona', 'Porfavor funcioname, no pido mas', [])

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('at least one pet must be selected')
        }
    })

    it('fails on non-arry pets', () => {
        let error

        try {
            createPetsitter(new ObjectId().toString(), 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'Els Altres', 'Barcelona', 'Porfavor funcioname, no pido mas', 123)

        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('pets is not a array')
        }
    })

    it('fails when field of city is empty', () => {
        let error

        try {
            createPetsitter(new ObjectId().toString(), 'https://tse4.mm.bing.net/th?id=OIP.mY2aGHOW4vQuHgrugXJWPwHaE8&pid=Api&P=0&h=180', 'Els Altres', '', 'Porfavor funcioname, no pido mas', ['conejos', 'cobayas'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('the field can not be empty')
        }
    })



    afterEach(() => Promise.all([User.deleteMany(), Petsitter.deleteMany()]))

    after(() => mongoose.disconnect())

})