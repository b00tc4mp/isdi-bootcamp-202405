import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import createPost from './createPost.js'
import getAllPosts from './getAllPosts.js'
import searchItems from './searchItems.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
import deletePost from './deletePost.js'
import createEvent from './createEvent.js'
import getAllEvents from './getAllEvents.js'
import deleteEvent from './deleteEvent.js'
import updateEventData from './updateEventData.js'
import getUsersByRole from './getUsersByRole.js'
import searchEvent from './searchEvent.js'
import toggleLikePost from './toggleLikePost.js'
import createComment from './createComment.js'
import getAllComments from './getAllComments.js'
import deleteComment from './deleteComment.js'
import createChat from './createChat.js'
import sendMessage from './sendMessage.js'
import getMessages from './getMessages.js'
import getEventByDate from './getEventByDate.js'
import getUserProfile from './getUserProfile.js'
import getUser from './getUser.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
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
    searchEvent,
    toggleLikePost,
    createComment,
    getAllComments,
    deleteComment,
    createChat,
    sendMessage,
    getMessages,
    getEventByDate,
    getUserProfile,
    getUser
}

export default logic