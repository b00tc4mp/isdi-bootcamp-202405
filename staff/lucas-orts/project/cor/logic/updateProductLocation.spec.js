import 'dotenv/config'
import updateProductLocation from './updateProductLocation.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Product } from '../data/models.js'

import errors from '../../com/errors.js'

const { NotFoundError, ValidationError, OwnershipError } = errors

describe('updateProductLocation', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds on existing user and product', () =>
        User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user =>
                Product.create({ farmer: user.id, name: 'tomato', type: 'cherry', minprice: 2, maxprice: 3, image: 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.38249928035046, 2.152969735831627] } })
                    .then(product => updateProductLocation(user.id, product.id, { type: 'Point', coordinates: [51.38249928035046, 4.152969735831627] })
                        .then(() => Product.findById(product.id).lean())
                        .then(updatedProduct => {
                            expect(updatedProduct.location.type).to.equal('Point')
                            expect(updatedProduct.location.coordinates).to.deep.equal([51.38249928035046, 4.152969735831627])//to.deep.equal compara arrays
                        })
                    )
            )
    )

    it('fails on non-existing user', () => {
        let _error

        return Product.create({ farmer: new ObjectId().toString(), name: 'tomato', type: 'cherry', minprice: 2, maxprice: 3, image: 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [41.38249928035046, 2.152969735831627] } })
            .then(product => updateProductLocation(new ObjectId().toString(), product.id, { type: 'Point', coordinates: [42.38249928035046, 5.152969735831627] }))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but non-existing product', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user => updateProductLocation(user.id, new ObjectId().toString(), { type: 'Point', coordinates: [42.38249928035046, 5.152969735831627] }))
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
                Product.create({ farmer: new ObjectId(), name: 'lemon', type: '', minprice: 5.3, maxprice: 6.1, image: 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [40.7128, -74.0060] } })
                    .then(product => updateProductLocation(user.id, product.id, { type: 'Point', coordinates: [42.38249928035046, 5.152969735831627] }))
                    .catch(error => _error = error)
                    .finally(() => {
                        expect(_error).to.be.instanceOf(OwnershipError)
                        expect(_error.message).to.equal('product does not belong to user')
                    })
            })
    })

    it('fails when product does not belong to the user', () => {
        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(ester => {
                // Después de crear a Ester, creamos a Carlos
                return User.create({ name: 'Carlos', surname: 'Lopez', email: 'carlos@lopez.com', phone: '965432876', address: 'calle Almendra 4, Cuenca', password: 'abc123123' })
                    .then(carlos => {
                        // Después de crear a Carlos, creamos un producto asociado a Carlos
                        return Product.create({ farmer: carlos.id, name: 'tomato', type: 'cherry', minprice: 2, maxprice: 3, image: 'https://media.giphy.com/media/ji6ccUcwNIuLS/giphy.gif?cid=790b7611qml3yetcjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [40.7128, -74.0060] } })
                            .then(product => {
                                // Intentamos que Ester actualice el producto de Carlos
                                return updateProductLocation(ester.id, product.id, { type: 'Point', coordinates: [42.38249928035046, 5.152969735831627] })
                                    .catch(error => {
                                        // Verificamos que el error sea de tipo OwnershipError
                                        expect(error).to.be.instanceOf(OwnershipError)
                                        expect(error.message).to.equal('product does not belong to user')
                                    })
                            })
                    })
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            updateProductLocation(123, new ObjectId().toString(), { type: 'Point', coordinates: [42.38249928035046, 5.152969735831627] })
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
            updateProductLocation(new ObjectId().toString(), 123, { type: 'Point', coordinates: [42.38249928035046, 5.152969735831627] })
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('productId is not a string')
        }
    })

    //TODO validate location

    afterEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    after(() => mongoose.disconnect())
})