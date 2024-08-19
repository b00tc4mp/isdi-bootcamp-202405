import 'dotenv/config'
import updateProductPrize from './updateProductPrize.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Product } from '../data/models.js'

import errors from '../../com/errors.js'

const { NotFoundError, ValidationError } = errors

describe('updateProductPrize', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds on existing user and product', () =>
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user =>
                Product.create({ farmer: user.id, name: 'tomato', type: 'cherry', minprize: 2, maxprize: 3, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g' })
                    .then(product => updateProductPrize(user.id, product.id, 3, 4)
                        .then(() => Product.findById(product.id).lean())
                        .then(updatedProduct => {
                            expect(updatedProduct.minprize).to.equal(3)
                            expect(updatedProduct.maxprize).to.equal(4)
                        })
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Product.create({ farmer: new ObjectId().toString(), name: 'tomato', type: 'cherry', minprize: 2, maxprize: 3, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g' })
            .then(product => updateProductPrize(new ObjectId().toString(), product.id, 3, 4))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing product', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => updateProductPrize(user.id, new ObjectId().toString(), 3, 4))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('product not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateProductPrize(123, new ObjectId().toString(), 3, 4)
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
            updateProductPrize(new ObjectId().toString(), 123, 3, 4)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('productId is not a string')
        }
    })

    it('fails on non-numeric minprize', () => {
        let error

        try {
            updateProductPrize(new ObjectId().toString(), new ObjectId().toString(), '123', 123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('minprize is not a number')
        }
    })
    it('fails on non-numeric maxprize', () => {
        let error

        try {
            updateProductPrize(new ObjectId().toString(), new ObjectId().toString(), 123, '123')
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('maxprize is not a number')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    after(() => mongoose.disconnect())
})