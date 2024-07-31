import jwt from 'jsonwebtoken'

import { errors } from "com"
import { logic } from "core"

const { NotFoundError, CredentialsError, ValidationError } = errors

export default (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password, (error) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                if (error instanceof CredentialsError)
                    status = 409

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            jwt.sign({ sub: username }, process.env.JWT_SECRET, (error, token) => {
                if (error) {
                    res.status(498).json({ error: SessionError.name, message: error.message })
                }

                res.json(token)
            })
        })
    } catch (error) {
        let status = 500

        if (error instanceof ValidationError)
            status = 400

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}