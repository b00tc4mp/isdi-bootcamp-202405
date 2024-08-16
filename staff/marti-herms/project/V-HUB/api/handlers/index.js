import authenticateUserHandler from './authenticateUserHandler.js'
import registerUserHandler from './registerUserHandler.js'
import getUserUsernameHandler from './getUserUsernameHandler.js'
import registerGameHandler from './registerGameHandler.js'
import searchGameHandler from './searchGameHandler.js'
import getUserLibraryHandler from './getUserLibraryHandler.js'
import getUserFavsHandler from './getUserFavsHandler.js'
import getGameByIdHandler from './getGameByIdHandler.js'
import getGamesReviewsHandler from './getGamesReviewsHandler.js'
import getDevUserGamesHandler from './getDevUserGamesHandler.js'
import toggleAddGameHandler from './toggleAddGameHandler.js'
import toggleFavGameHandler from './toggleFavGameHandler.js'
import makeReviewHandler from './makeReviewHandler.js'
import deleteReviewHandler from './deleteReviewHandler.js'

const handle = {
    authenticateUser: authenticateUserHandler,
    registerUser: registerUserHandler,
    getUserUsername: getUserUsernameHandler,
    registerGame: registerGameHandler,
    searchGame: searchGameHandler,
    getUserLibrary: getUserLibraryHandler,
    getUserFavs: getUserFavsHandler,
    getGameById: getGameByIdHandler,
    getGamesReviews: getGamesReviewsHandler,
    getDevUserGames: getDevUserGamesHandler,
    toggleAddGame: toggleAddGameHandler,
    toggleFavGame: toggleFavGameHandler,
    makeReview: makeReviewHandler,
    deleteReview: deleteReviewHandler
}

export default handle