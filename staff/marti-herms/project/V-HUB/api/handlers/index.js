import authenticateUserHandler from './authenticateUserHandler.js'
import registerUserHandler from './registerUserHandler.js'
import getUserUsernameHandler from './getUserUsernameHandler.js'
import registerGameHandler from './registerGameHandler.js'

const handle = {
    authenticateUser: authenticateUserHandler,
    registerUser: registerUserHandler,
    getUserUsername: getUserUsernameHandler,
    registerGame: registerGameHandler
}

export default handle