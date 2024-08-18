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
import getAllEvents from './getAllEvents'
import deleteEvent from './deleteEvent'
import updateEventData from './updateEventData'
import getUsersByRole from './getUsersByRole'
import searchEvent from './searchEvent'

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
    createEvent,
    getAllEvents,
    deleteEvent,
    updateEventData,
    getUsersByRole,
    searchEvent
}

export default logic