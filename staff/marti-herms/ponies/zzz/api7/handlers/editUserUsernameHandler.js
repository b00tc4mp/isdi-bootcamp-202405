import jwt from 'jsonwebtoken'

import { logic } from 'core'

import { errors } from 'com'

const { SessionError } = errors

export default (req, res, next) => {
    const { username } = req

    const { newUsername, password } = req.body

    try {
        logic.editUserUsername(username, newUsername, password, (error) => {
            if (error) {
                next(error)

                return
            }

            jwt.sign({ sub: newUsername }, process.env.JWT_SECRET, (error, token) => {
                if (error) {
                    next(new SessionError(error.message))

                    return
                }

                res.json(token)
            })
        })
    } catch (error) {
        next(error)
    }
}