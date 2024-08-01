import { logic } from "core"

export default (req, res, next) => {
    const { name, surname, email, username, password } = req.body

    try {
        logic.registerUser(name, surname, email, username, password)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}