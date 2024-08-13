import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import getUserId from './getUserId'
import logoutUser from './logoutUser'
import createPost from './createPost'
import getAllPosts from './getAllPosts'
import searchItems from './searchItems'
import toggleFollowUser from './toggleFollowUser'
import getAllFollowingUserPosts from './getAllFollowingUserPosts'
import deletePost from './deletePost'
import createEvent from './createEvent'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    getUserId,
    logoutUser,
    createPost,
    getAllPosts,
    searchItems,
    toggleFollowUser,
    getAllFollowingUserPosts,
    deletePost,
    createEvent
}

export default logic