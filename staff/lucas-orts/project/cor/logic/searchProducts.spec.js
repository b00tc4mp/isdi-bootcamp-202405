import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Product } from '../data/models.js'
import errors from '../../com/errors.js'
import searchProducts from './searchProducts.js'

const { ValidationError } = errors

describe('searchProducts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([Product.deleteMany(), User.deleteMany()]))

    it('succeeds on search product by name and location', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user =>
                Product.create({ farmer: user.id, name: 'tomato', type: 'blue', minprice: 3.1, maxprice: 4.1, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [40.7128, -74.0060] } })
                    .then(() =>
                        Product.create({ farmer: user.id, name: 'tomato', type: 'pink', minprice: 4.6, maxprice: 6.7, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [40.7128, -74.0060] } })
                            .then(() => {
                                return searchProducts('tomato', '', 1, [40.7128, -74.006])
                            })
                            .then(products => {
                                expect(products).to.be.an('array')
                                expect(products).to.have.lengthOf(2)
                                expect(products[0].name).to.equal('tomato')
                                expect(products[0].type).to.equal('blue')
                                expect(products[1].name).to.equal('tomato')
                                expect(products[1].type).to.equal('pink')
                            })
                    )
            )
    })

    it('succeeds on search product by name, type and location', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', phone: '966234731', address: 'calle Tertulia 3, Cuenca', password: '123123123' })
            .then(user =>
                Product.create({ farmer: user.id, name: 'tomato', type: 'blue', minprice: 3.1, maxprice: 4.1, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [40.7128, -74.0060] } })
                    .then(() =>
                        Product.create({ farmer: user.id, name: 'tomato', type: 'pink', minprice: 4.6, maxprice: 6.7, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g', location: { type: 'Point', coordinates: [40.7128, -74.0060] } })
                            .then(() => {
                                return searchProducts('tomato', 'blue', 1, [40.7128, -74.006])
                            })
                            .then(products => {
                                expect(products).to.be.an('array')
                                expect(products).to.have.lengthOf(1)
                                expect(products[0].name).to.equal('tomato')
                                expect(products[0].type).to.equal('blue')
                            })
                    )
            )
    })


    it('fails on non-string name', () => {
        let error

        try {
            searchProducts(123, 'cherry', 1, [40.7128, -74.006])
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
            searchProducts('tomato', 123, 1, [40.7128, -74.006])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('type is not a string')
        }
    })

    it('fails on non-number distance', () => {
        let error

        try {
            searchProducts('tomato', '', '1', [40.7128, -74.006])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('distance is not a number')
        }
    })

    it('fails on non-array coords', () => {
        let error = null; // Asegúrate de inicializar el error como null

        try {
            searchProducts('tomato', '', 1, new Object)  // Forzamos el error
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('coords must be an array')
        }
    })

    it('fails on non-number coords[0]', () => {
        let error = null;  // Inicializar el error como null

        try {
            searchProducts('tomato', '', 1, ['40.7128', -74.006])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('coords latitude is not a number')
        }
    })



    it('fails on non-number coords[1]', () => {
        let error

        try {
            searchProducts('tomato', '', 1, [40.7128, '-74.006'])
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('coords longitude is not a number')
        }
    })

    afterEach(() => Product.deleteMany())

    after(() => mongoose.disconnect())
})
