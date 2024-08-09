import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { name, surname, username, email, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, surname, username, email, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}