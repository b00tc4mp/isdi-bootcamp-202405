import authenticateUser from './authenticateUser.js'
import deleteUserById from './deleteUserById.js'
import getFavUsers from './getFavUsers.js'
import getLikeUsers from './getLikeUsers.js'
import getAllProjects from './getAllProjects.js'
import getAllInvestors from './getAllInvestors.js'
import getUserName from './getUserName.js'
import registerInvestor from './registerInvestor.js'
import registerProject from './registerProject.js'
import toggleDislikeUser from './toggleDislikeUser.js'
import toggleLikeUser from './toggleLikeUser.js'
import toggleFavUser from './toggleFavUser.js'
import updateAvatar from './updateAvatar.js'
import updateImage from './updateImage.js'
import updatePassword from './updatePassword.js'
import updateDescription from './updateDescription.js'
import searchUser from './searchUser.js'

const logic = {
    authenticateUser,
    deleteUserById,
    getFavUsers,
    getLikeUsers,
    getAllProjects,
    getAllInvestors,
    getUserName,
    registerInvestor,
    registerProject,
    toggleDislikeUser,
    toggleLikeUser,
    toggleFavUser,
    updateAvatar,
    updateImage,
    updateDescription,
    updatePassword,
    searchUser
}

export default logic
