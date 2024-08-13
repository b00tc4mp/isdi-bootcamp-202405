import authenticateUserHandler from './authenticateUserHandler.js'
import registerUserHandler from './registerUserHandler.js'
import getUserUsernameHandler from './getUserUsernameHandler.js'
import registerGameHandler from './registerGameHandler.js'
import searchGameHandler from './searchGameHandler.js'
import getUserLibraryHandler from './getUserLibraryHandler.js'
import toggleAddGameHandler from './toggleAddGameHandler.js'

const handle = {
    authenticateUser: authenticateUserHandler,
    registerUser: registerUserHandler,
    getUserUsername: getUserUsernameHandler,
    registerGame: registerGameHandler,
    searchGame: searchGameHandler,
    getUserLibrary: getUserLibraryHandler,
    toggleAddGame: toggleAddGameHandler
}

export default handle