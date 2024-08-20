import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { name, surname, email, username, dni, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, surname, email, username, dni, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}