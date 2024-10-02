import deleteUserById from './deleteUserById.js'
import deleteChatById from './deleteChatById.js'
import createChat from './createChat.js'
import getAllChats from './getAllChats.js'
import getAllProjects from './getAllProjects.js'
import getAllInvestors from './getAllInvestors.js'
import getAllMatchs from './getAllMatchs.js'
import getChatMessages from './getChatMessages.js'
import getChatParticipant from './getChatParticipant.js'
import getLikeUsers from './getLikeUsers.js'
import getUser from './getUser.js'
import getUserName from './getUserName.js'
import getUserId from './getUserId.js'
import getUserRole from './getUserRole.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerInvestor from './registerInvestor.js'
import registerProject from './registerProject.js'
import sendMessage from './sendMessage.js'
import toggleDislikeUser from './toggleDislikeUser.js'
import toggleFavUser from './toggleFavUser.js'
import toggleLikeUser from './toggleLikeUser.js'
import updateAvatar from './updateAvatar.js'
import updateImage from './updateImage.js'
import updateDescription from './updateDescription.js'
import updatePassword from './updatePassword.js'
import searchUser from './searchUser.js'

const logic = {
    deleteUserById,
    deleteChatById,
    createChat,
    getAllChats,
    getAllInvestors,
    getAllProjects,
    getAllMatchs,
    getChatMessages,
    getChatParticipant,
    getLikeUsers,
    getUserName,
    getUserId,
    getUser,
    getUserRole,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerInvestor,
    registerProject,
    sendMessage,
    toggleDislikeUser,
    toggleFavUser,
    toggleLikeUser,
    updateAvatar,
    updateImage,
    updateDescription,
    updatePassword,
    searchUser
}

export default logic