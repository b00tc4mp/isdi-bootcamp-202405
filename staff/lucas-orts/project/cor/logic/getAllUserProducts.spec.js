import 'dotenv/config'
import getAllUserProducts from './getAllUserProducts.js'
import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'
import { User, Product } from '../data/models.js'

import errors from '../../com/errors.js'
const { NotFoundError, ValidationError } = errors

describe('getAllUserProducts', () => {
    before(() => mongoose.connect(process.env.MONGODB_URI))

    beforeEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    it('succeeds on existing user listing all products', () => {
        return User.create({ name: 'Mono', surname: 'Loco', email: 'mono@loco.com', username: 'monoloco', password: '123123123' })
            .then(user =>
                Product.create({ farmer: user.id, name: 'lemon', type: '', minprice: 3.1, maxprice: 4.1, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g' })
                    .then(product1 =>
                        Product.create({ farmer: user.id, name: 'tomato', type: 'pink', minprice: 4.6, maxprice: 6.7, image: 'https://media.giphy.com/media/ji6zzUZwNIuLS/giphy.gif?cid=790b7611qml3yetzjkqcp26cvoxayvif8j713kmqj2yp06oi&ep=v1_gifs_trending&rid=giphy.gif&ct=g' })
                            .then(product2 =>
                                getAllUserProducts(user.id)
                                    .then(products => {
                                        debugger
                                        expect(products[0].farmer.id).to.equal(user.id)
                                        expect(products[1].farmer.id).to.equal(user.id)
                                        expect(products[0].name).to.equal('lemon')
                                        expect(products[1].name).to.equal('tomato')
                                        expect(products[0].type).to.equal('')
                                        expect(products[1].type).to.equal('pink')
                                        expect(products[0].minprice).to.equal(3.1)
                                        expect(products[1].minprice).to.equal(4.6)
                                        expect(products[0].maxprice).to.equal(4.1)
                                        expect(products[1].maxprice).to.equal(6.7)
                                        expect(products[0].enabled).to.be.true
                                        expect(products[1].enabled).to.be.true
                                    })
                            )
                    )
            )
    })

    it('fails on non-existing user', () => {
        let _error

        return getAllUserProducts(new ObjectId().toString())
            .catch(error => _error = error)
            .finally(() => {
                expect(_error).to.be.instanceOf(NotFoundError)
                expect(_error.message).to.equal('user not found')
            })
    })

    it('fails on non-string userId', () => {
        let error

        try {
            getAllUserProducts(123)
        } catch (_error) {
            error = _error
        } finally {
            expect(error).to.be.instanceOf(ValidationError)
            expect(error.message).to.equal('userId is not a string')
        }
    })

    afterEach(() => Promise.all([User.deleteMany(), Product.deleteMany()]))

    after(() => mongoose.disconnect())
})