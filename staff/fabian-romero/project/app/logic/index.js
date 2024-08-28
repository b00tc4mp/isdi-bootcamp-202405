import deleteUserById from './deleteUserById.js'
import getAllProjects from './getAllProjects.js'
import getAllInvestors from './getAllInvestors.js'
import getFavUsers from './getFavUsers.js'
import getLikeUsers from './getLikeUsers.js'
import getUserName from './getUserName.js'
import getUserId from './getUserId.js'
import getUserRole from './getUserRole.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerInvestor from './registerInvestor.js'
import registerProject from './registerProject.js'
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
    getAllInvestors,
    getAllProjects,
    getFavUsers,
    getLikeUsers,
    getUserName,
    getUserId,
    getUserRole,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerInvestor,
    registerProject,
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