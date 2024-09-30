import authenticateUser from './authenticateUser.js'
import deleteChatById from './deleteChatById.js'
import deleteUserById from './deleteUserById.js'
import createChat from './createChat.js'
import getChatMessages from './getChatMessages.js'
import getChatParticipant from './getChatParticipant.js'
import getLikeUsers from './getLikeUsers.js'
import getAllChats from './getAllChats.js'
import getAllProjects from './getAllProjects.js'
import getAllInvestors from './getAllInvestors.js'
import getAllMatchs from './getAllMatchs.js'
import getUser from './getUser.js'
import getUserName from './getUserName.js'
import registerInvestor from './registerInvestor.js'
import registerProject from './registerProject.js'
import sendMessage from './sendMessage.js'
import toggleDislikeUser from './toggleDislikeUser.js'
import toggleLikeUser from './toggleLikeUser.js'
import updateAvatar from './updateAvatar.js'
import updateImage from './updateImage.js'
import updatePassword from './updatePassword.js'
import updateDescription from './updateDescription.js'
import searchUser from './searchUser.js'

const logic = {
    authenticateUser,
    deleteUserById,
    deleteChatById,
    createChat,
    getChatMessages,
    getChatParticipant,
    getLikeUsers,
    getAllChats,
    getAllMatchs,
    getAllProjects,
    getAllInvestors,
    getUserName,
    getUser,
    registerInvestor,
    registerProject,
    sendMessage,
    toggleDislikeUser,
    toggleLikeUser,
    updateAvatar,
    updateImage,
    updateDescription,
    updatePassword,
    searchUser
}

export default logic
