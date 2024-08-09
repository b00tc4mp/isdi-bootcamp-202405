import authenticateUserHandler from './authenticateUserHandler.js'
import registerUserHandler from './registerUserHandler.js'

const handle = {
    authenticateUser: authenticateUserHandler,
    registerUser: registerUserHandler
}

export default handle