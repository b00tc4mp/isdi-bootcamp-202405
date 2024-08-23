import 'dotenv/config'
import updateProductImage from './updateProductImage.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Product } from '../data/models.js'

import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors

describe('updateProductImage', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds on existing user and product', () =>
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user =>
                Product.create({ farmer: user.id, name: 'tomato', type: 'cherry', minprice: 2, maxprice: 3, image: 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g' })
                    .then(product => updateProductImage(user.id, product.id, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?')
                        .then(() => Product.findById(product.id).lean())
                        .then(updatedProduct => {
                            expect(updatedProduct.image).to.equal('https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?')
                        })
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Product.create({ farmer: new ObjectId().toString(), name: 'tomato', type: 'cherry', minprice: 2, maxprice: 3, image: 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g' })
            .then(product => updateProductImage(new ObjectId().toString(), product.id, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing product', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => updateProductImage(user.id, new ObjectId().toString(), 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?'))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('product not found')
            })
    })

    it('fails on existing user and product but product does not belog to user', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => {
                Product.create({ farmer: new ObjectId(), name: 'lemon', type: '', minprice: 5.3, maxprice: 6.1, image: 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g' })
                    .then(product => updateProductImage(user.id, product.id))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(OwnerShipError)
                        expect(_error.message).to.equal('product does not belong to user')
                    })
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateProductImage(123, new ObjectId().toString(), 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    it('fails on non-string productId', () => {
        let error

        try {
            updateProductImage(new ObjectId().toString(), 123, 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('productId is not a string')
        }
    })

    it('fails on non-string image', () => {
        let error

        try {
            updateProductImage(new ObjectId().toString(), new ObjectId().toString(), 123)
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
            updateProductImage(new ObjectId().toString(), new ObjectId().toString(), 'htpp:')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('invalid image')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    after(() => mongoose.disconnect())
})