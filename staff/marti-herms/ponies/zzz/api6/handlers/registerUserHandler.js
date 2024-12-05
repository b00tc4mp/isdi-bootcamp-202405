import { errors } from "com"
import { logic } from "core"

const { DuplicityError, ValidationError } = errors

export default (req, res) => {
    const { name, surname, email, username, password } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, (error) => {
            if (error) {
                let status = 500

                if (error instanceof DuplicityError)
                    status = 409

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        let status = 500

        if (error instanceof ValidationError)
            status = 400

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}