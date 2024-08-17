import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import getUserUsername from './getUserUsername.js'
import registerGame from './registerGame.js'
import searchGame from './searchGame.js'
import searchUser from './searchUser.js'
import getUserLibrary from './getUserLibrary.js'
import getUserFavs from './getUserFavs.js'
import getGameById from './getGameById.js'
import getGameReviews from './getGameReviews.js'
import getDevUserGames from './getDevUserGames.js'
import toggleAddGame from './toggleAddGame.js'
import toggleFavGame from './toggleFavGame.js'
import toggleFollowUser from './toggleFollowUser.js'
import makeReview from './makeReview.js'
import deleteReview from './deleteReview.js'
import getUserAvatar from './getUserAvatar.js'
import getUser from './getUser.js'
import editUserAvatar from './editUserAvatar.js'
import editUserUsername from './editUserUsername.js'

const logic = {
    deleteReview,
    editUserAvatar,
    editUserUsername,
    getDevUserGames,
    getGameById,
    getGameReviews,
    getUser,
    getUserAvatar,
    getUserFavs,
    getUserLibrary,
    getUserUsername,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    makeReview,
    registerGame,
    registerUser,
    searchGame,
    searchUser,
    toggleAddGame,
    toggleFavGame,
    toggleFollowUser,
}

export default logic