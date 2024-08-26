import authenticateUserHandler from './authenticateUserHandler.js'
import registerUserHandler from './registerUserHandler.js'
import getUserUsernameHandler from './getUserUsernameHandler.js'
import registerGameHandler from './registerGameHandler.js'
import searchGameHandler from './searchGameHandler.js'
import searchUserHandler from './searchUserHandler.js'
import getUserLibraryHandler from './getUserLibraryHandler.js'
import getUserFavsHandler from './getUserFavsHandler.js'
import getGameByIdHandler from './getGameByIdHandler.js'
import getGamesReviewsHandler from './getGamesReviewsHandler.js'
import getDevUserGamesHandler from './getDevUserGamesHandler.js'
import getUserFollowersHandler from './getUserFollowersHandler.js'
import getUserFollowingHandler from './getUserFollowingHandler.js'
import toggleAddGameHandler from './toggleAddGameHandler.js'
import toggleFavGameHandler from './toggleFavGameHandler.js'
import toggleFollowUserHandler from './toggleFollowUserHandler.js'
import makeReviewHandler from './makeReviewHandler.js'
import deleteReviewHandler from './deleteReviewHandler.js'
import getUserAvatarHandler from './getUserAvatarHandler.js'
import getUserHandler from './getUserHandler.js'
import editUserAvatarHandler from './editUserAvatarHandler.js'
import editUserUsernameHandler from './editUserUsernameHandler.js'
import openChatHandler from './openChatHandler.js'
import sendMessageHandler from './sendMessageHandler.js'
import getChatMessagesHandler from './getChatMessagesHandler.js'

const handle = {
    authenticateUser: authenticateUserHandler,
    deleteReview: deleteReviewHandler,
    editUserAvatar: editUserAvatarHandler,
    editUserUsername: editUserUsernameHandler,
    getChatMessages: getChatMessagesHandler,
    getDevUserGames: getDevUserGamesHandler,
    getGameById: getGameByIdHandler,
    getGamesReviews: getGamesReviewsHandler,
    getUser: getUserHandler,
    getUserAvatar: getUserAvatarHandler,
    getUserFavs: getUserFavsHandler,
    getUserFollowers: getUserFollowersHandler,
    getUserFollowing: getUserFollowingHandler,
    getUserLibrary: getUserLibraryHandler,
    getUserUsername: getUserUsernameHandler,
    makeReview: makeReviewHandler,
    openChat: openChatHandler,
    registerGame: registerGameHandler,
    registerUser: registerUserHandler,
    searchGame: searchGameHandler,
    searchUser: searchUserHandler,
    sendMessage: sendMessageHandler,
    toggleAddGame: toggleAddGameHandler,
    toggleFavGame: toggleFavGameHandler,
    toggleFollowUser: toggleFollowUserHandler
}

export default handle