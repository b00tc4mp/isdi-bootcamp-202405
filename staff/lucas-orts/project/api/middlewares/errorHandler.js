import { errors } from 'com'

const { NotFoundError, CredentialsError, DuplicityError, ValidationError } = errors

export default (error, req, res, next) => {
    let status = 500

    if (error instanceof ValidationError)
        status = 400
    else if (error instanceof CredentialsError)
        status = 401
    else if (error instanceof NotFoundError)
        status = 404
    else if (error instanceof DuplicityError)
        status = 409

    res.status(status).json({ error: error.constructor.name, message: error.message })
}