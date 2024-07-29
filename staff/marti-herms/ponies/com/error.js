class ValidationError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class OwnershipError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class OutOfBoundsError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class CorruptedInfoError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

const errors = {
    ValidationError,
    NotFoundError,
    DuplicityError,
    SystemError,
    OwnershipError,
    CredentialsError,
    OutOfBoundsError,
    CorruptedInfoError
}

export default errors