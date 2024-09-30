import { errors } from '../../com/index.js'

const { NotFoundError, CredentialsError, OwnerShipError, DuplicityError, SessionError, ValidationError } = errors

export default (error, req, res, next) => {
    let status = 500

    if (error instanceof ValidationError)
        status = 500
    if (error instanceof CredentialsError)
        status = 401
    if (error instanceof OwnerShipError)
        status = 403
    if (error instanceof NotFoundError)
        status = 404
    if (error instanceof DuplicityError)
        status = 409
    if (error instanceof SessionError)
        status = 498

    res.status(status).json({ error: error.constructor.name, message: error.message })
}