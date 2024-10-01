import { Product } from '../data/models.js'
import { validate, errors } from 'com'

const { SystemError } = errors

export default (name, type, distance, coords) => {
    // Validaciones de entrada
    if (name) validate.string(name, 'name')
    if (type) validate.string(type, 'type')
    if (distance) validate.number(distance, 'distance')
    validate.coordinates(coords, 'coords')

    // Construcción de la consulta
    const queryObject = {
        enabled: true  // Solo productos habilitados
    }

    // Filtro por nombre y tipo
    if (name) queryObject.name = new RegExp(name, 'i')  // Filtra por nombre si está presente
    if (type) queryObject.type = new RegExp(type, 'i')  // Filtra por tipo si está presente

    // Filtro de proximidad basado en las coordenadas y la distancia
    if (coords && distance) {
        queryObject.location = {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: coords
                },
                $maxDistance: distance * 1000  // Convertir la distancia de kilómetros a metros
            }
        }
    }

    // Consulta a la base de datos para buscar los productos
    return Product.find(queryObject, { __v: 0 }).sort({ name: 1, type: 1 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(products => {
            // Procesar los productos y devolverlos
            return products.map(product => {
                product.id = product._id.toString()  // Convertir el _id a string
                delete product._id  // Eliminar el campo _id de la respuesta

                return product
            })
        })
}