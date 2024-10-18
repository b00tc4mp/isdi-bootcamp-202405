import { User, Product } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (productId) => {
    // Validar el productId
    validate.string(productId, 'productId') // Asegúrate de que esto coincida con tu lógica de validación

    // Buscar el producto por su ID
    return Product.findById(productId, { __v: 0 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(product => {
            if (!product) throw new NotFoundError('product not found')
            return User.findById(product.farmer).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(farmer => {
                    if (!farmer) throw new NotFoundError('farmer not found')

                    product.farmer = {
                        id: farmer._id.toString(),
                        name: farmer.name,
                        surname: farmer.surname,
                        email: farmer.email,
                        phone: farmer.phone,
                        address: farmer.address
                    }

                    product.id = product._id.toString()
                    delete product._id

                    product.location.id = product.location._id.toString()
                    delete product.location._id

                    return product
                })

        })
}