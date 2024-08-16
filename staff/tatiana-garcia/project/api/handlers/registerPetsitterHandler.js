import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { image, name, surname, username, cif, city, email, password, passwordRepeat } = req.body

    try {
        logic.registerPetsitter(image, name, surname, username, cif, city, email, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}