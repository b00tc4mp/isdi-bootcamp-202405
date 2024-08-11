import { errors } from '../../com/index.js'

const { ValidationError, DuplicityError } = errors

export default (error, req, res, next) => {
    let status = 500

    if (error instanceof ValidationError)
        status = 400
    else if (error instanceof DuplicityError)
        status = 409
    res.status(status).json({ error: error.constructor.name, message: error.message })
}