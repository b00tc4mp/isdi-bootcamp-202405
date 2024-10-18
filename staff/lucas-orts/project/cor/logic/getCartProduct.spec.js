import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Product } from '../data/models.js'
import errors from '../../com/errors.js'
import getCartProduct from './getCartProduct.js'

const { ObjectId } = Types

const { ValidationError, NotFoundError } = errors

describe('getCartProduct', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([Product.deleteMany(), User.deleteMany()]))

    it('succeeds get cart Product by productId', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user =>
                Product.create({ farmer: user.id, name: 'tomato', type: 'blue', minprice: 3.1, maxprice: 4.1, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [40.7128, -74.0060] } })
                    .then((product) => {
                        return getCartProduct(product.id)
                    })
                    .then(product => {

                        expect(product.id).to.equal(product.id)
                    })
            )
    })

    it('fails on non-string productId', () => {
        let error

        try {
            getCartProduct(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('productId is not a string')
        }
    })

    it('fails on non-existing product', () => {
        let _error

        return User.create({ name: 'Ester', surname: 'Colero', email: 'ester@colero.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(() => getCartProduct(new ObjectId().toString()))
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('product not found')
            })
    })

    afterEach(() => Product.deleteMany())

    after(() => mongoose.disconnect())
})
