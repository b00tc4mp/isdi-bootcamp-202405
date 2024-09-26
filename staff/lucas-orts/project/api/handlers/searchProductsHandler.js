import { logic } from 'cor'

export default (req, res, next) => {
    let { query: { name, type, distance, coords } } = req


    // Convertir distancia a número
    distance = Number(distance)

    coords = coords.split(',').map(coord => Number(coord))

    try {
        logic.searchProducts(name, type, distance, coords)
            .then(products => res.json(products))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}