import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

const { ObjectId } = Types

import createProduct from './createProduct.js'
import { User, Product } from '../data/models.js'

import errors from '../../com/errors.js'
const { ValidationError, NotFoundError } = errors

describe('createProduct', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds on new product', () =>
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user =>
                createProduct(user.id, 'lemon', '', 5.3, 6.1, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                    .then(() => Product.findOne({ farmer: user.id })
                        .then(product => {
                            expect(product.farmer.toString()).to.equal(user.id)
                            expect(product.name).to.equal('lemon')
                            expect(product.type).to.equal('')
                            expect(product.minprice).to.equal(5.3)
                            expect(product.maxprice).to.equal(6.1)
                            expect(product.image).to.equal('https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
                        })
                    )
            )
    )


    it('fails on non-existing user', () => {
        let _error

        return createProduct(new ObjectId().toString(), 'lemon', '', 5.3, 6.1, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            createProduct(123, 'lemon', '', 5.3, 6.1, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string name', () => {
        let error

        try {
            createProduct(new ObjectId().toString(), 123, '', 5.3, 6.1, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on non-string type', () => {
        let error

        try {
            createProduct(new ObjectId().toString(), 'lemon', 123, 5.3, 6.1, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('type is not a string')
        }
    })

    it('fails on non-number minprice', () => {
        let error

        try {
            createProduct(new ObjectId().toString(), 'lemon', '', '5.3', 6.1, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('minprice is not a number')
        }
    })

    it('fails on non-number maxprice', () => {
        let error

        try {
            createProduct(new ObjectId().toString(), 'lemon', '', 5.3, '6.1', 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('maxprice is not a number')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            createProduct(new ObjectId().toString(), 'lemon', '', 5.3, 6.1, 321)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('image is not a string')
        }
    })

    it('fails on invalid image', () => {
        let error

        try {
            createProduct(new ObjectId().toString(), 'lemon', '', 5.3, 6.1, 'htpp:')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    afterEach(() => Promise.all([User.deleteMany, Product.deleteMany()]))

    after(() => mongoose.disconnect())
})