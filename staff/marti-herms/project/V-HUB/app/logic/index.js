import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import getUserUsername from './getUserUsername.js'
import registerGame from './registerGame.js'
import searchGame from './searchGame.js'
import getUserLibrary from './getUserLibrary.js'
import getUserFavs from './getUserFavs.js'
import getGameById from './getGameById.js'
import getGameReviews from './getGameReviews.js'
import toggleAddGame from './toggleAddGame.js'
import toggleFavGame from './toggleFavGame.js'
import makeReview from './makeReview.js'

const logic = {
    loginUser,
    logoutUser,
    registerUser,
    isUserLoggedIn,
    getUserUsername,
    registerGame,
    searchGame,
    getUserLibrary,
    getUserFavs,
    getGameById,
    getGameReviews,
    toggleAddGame,
    toggleFavGame,
    makeReview
}

export default logic