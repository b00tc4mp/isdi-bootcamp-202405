import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
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
    authenticateUser,
    registerUser,
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