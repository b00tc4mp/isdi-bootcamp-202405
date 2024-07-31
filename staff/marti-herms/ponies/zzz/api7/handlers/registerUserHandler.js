import { logic } from "core"

export default (req, res, next) => {
    const { name, surname, email, username, password } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, (error) => {
            if (error) {
                next(error)

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        next(error)
    }
}