import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { name, username, role, email, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, username, role, email, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}