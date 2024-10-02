import { errors } from 'com'

const { NotFoundError, CredentialsError, OwnershipError, DuplicityError, ValidationError, SessionError, PermissionError } = errors

export default (error, req, res, next) => {
    let status = 500

    if (error instanceof ValidationError)
        status = 400
    else if (error instanceof CredentialsError)
        status = 401
    else if (error instanceof OwnershipError)
        status = 403
    else if (error instanceof NotFoundError)
        status = 404
    else if (error instanceof DuplicityError)
        status = 409
    else if (error instanceof SessionError)
        status = 498
    else if (error instanceof PermissionError)
        status = 406

    res.status(status).json({ error: error.constructor.name, message: error.message })
}