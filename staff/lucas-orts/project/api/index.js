import 'dotenv/config'
import express from 'express'

import { mongoose } from 'cor'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    updatePasswordHandler,
    updateUserAddressHandler,
    updateUserPhoneHandler,
    updateEmailHandler,
    createProductHandler,
    updateProductPriceHandler,
    updateProductImageHandler,
    toggleProductEnableHandler,
    deleteProductHandler,
    getAllUserProductsHandler,
    updateProductLocationHandler,
    searchProductsHandler,
    getCartProductHandler,
    productInfoHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.patch('/users/password', jwtVerifier, jsonBodyParser, updatePasswordHandler)

        api.patch('/users/address', jwtVerifier, jsonBodyParser, updateUserAddressHandler)

        api.patch('/users/phone', jwtVerifier, jsonBodyParser, updateUserPhoneHandler)

        api.patch('/users/email', jwtVerifier, jsonBodyParser, updateEmailHandler)

        api.post('/products', jwtVerifier, jsonBodyParser, createProductHandler)

        api.patch('/products/:productId/price', jwtVerifier, jsonBodyParser, updateProductPriceHandler)

        api.patch('/products/:productId/image', jwtVerifier, jsonBodyParser, updateProductImageHandler)

        api.patch('/products/:productId/location', jwtVerifier, jsonBodyParser, updateProductLocationHandler)

        api.patch('/products/:productId/enable', jwtVerifier, toggleProductEnableHandler)

        api.delete('/products/:productId', jwtVerifier, deleteProductHandler)

        api.get('/products', jwtVerifier, getAllUserProductsHandler)

        api.get('/products/search', searchProductsHandler)

        api.get('/products/:productId', getCartProductHandler)

        api.get('/products/product/:productId', productInfoHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))