import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { name, surname, username, cif, city, email, password, passwordRepeat } = req.body

    try {
        logic.registerPetsitterUser(name, surname, username, cif, city, email, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}