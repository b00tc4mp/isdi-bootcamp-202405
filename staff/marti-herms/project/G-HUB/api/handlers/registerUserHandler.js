import { logic } from 'core'

export default (req, res, next) => {
    const { username, email, password, role } = req.body

    try {
        logic.registerUser(username, email, password, role)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}