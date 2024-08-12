import getAllPosts from './getAllPosts.js'
import getUserName from './getUserName.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import toggleLikePost from './toggleLikePost.js'
import updatePostCaption from './updatePostCaption.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import toggleFavPost from './toggleFavPost.js'
import getAllFavPosts from './getAllFavPosts.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
import updateAvatar from './updateAvatar.js'
import getUser from './getUser.js'
import updatePassword from './updatePassword.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import getUserId from './getUserId.js'
import searchPosts from './searchPosts.js'

const logic = {
    getAllPosts,
    getUserName,
    getUserId,
    loginUser,
    logoutUser,
    registerUser,
    toggleLikePost,
    updatePostCaption,
    createPost,
    deletePost,
    toggleFavPost,
    getAllFavPosts,
    toggleFollowUser,
    getAllFollowingUserPosts,
    updateAvatar,
    getUser,
    updatePassword,
    isUserLoggedIn,
    searchPosts
}

export default logic