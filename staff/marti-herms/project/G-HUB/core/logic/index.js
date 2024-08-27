import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUserUsername from './getUserUsername.js'
import registerGame from './registerGame.js'
import searchGame from './searchGame.js'
import searchUser from './searchUser.js'
import getUserLibrary from './getUserLibrary.js'
import getUserFavs from './getUserFavs.js'
import getGameById from './getGameById.js'
import getGameReviews from './getGameReviews.js'
import getDevUserGames from './getDevUserGames.js'
import getUserFollowing from './getUserFollowing.js'
import getUserFollowers from './getUserFollowers.js'
import toggleAddGame from './toggleAddGame.js'
import toggleFavGame from './toggleFavGame.js'
import toggleFollowUser from './toggleFollowUser.js'
import makeReview from './makeReview.js'
import deleteReview from './deleteReview.js'
import getUserAvatar from './getUserAvatar.js'
import getUser from './getUser.js'
import editUserAvatar from './editUserAvatar.js'
import editUserUsername from './editUserUsername.js'
import openChat from './openChat.js'
import sendMessage from './sendMessage.js'
import getChatMessages from './getChatMessages.js'
import getUserChats from './getUserChats.js'

const logic = {
    authenticateUser,
    deleteReview,
    editUserAvatar,
    editUserUsername,
    getChatMessages,
    getDevUserGames,
    getGameById,
    getGameReviews,
    getUser,
    getUserAvatar,
    getUserFavs,
    getUserLibrary,
    getUserFollowers,
    getUserFollowing,
    getUserUsername,
    makeReview,
    openChat,
    registerGame,
    registerUser,
    searchGame,
    searchUser,
    sendMessage,
    toggleAddGame,
    toggleFavGame,
    toggleFollowUser,
    getUserChats
}

export default logic