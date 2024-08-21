import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { image, name, surname, city, description, email, password, passwordRepeat, pets } = req.body

    try {
        logic.registerPetsitterUser(image, name, surname, city, description, email, password, passwordRepeat, pets)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}