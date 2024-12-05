import { errors } from "com"

const { NotFoundError, CredentialsError, OwnershipError, OutOfBoundsError, DuplicityError, SessionError, ValidationError } = errors

export default (error, req, res, next) => {
    let status = 500

    if (error instanceof NotFoundError)
        status = 404

    else if (error instanceof CredentialsError || error instanceof DuplicityError)
        status = 409

    else if (error instanceof OwnershipError || error instanceof OutOfBoundsError)
        status = 403

    else if (error instanceof ValidationError)
        status = 400

    else if (error instanceof SessionError)
        status = 498

    res.status(status).json({ error: error.constructor.name, message: error.message })

    return
}