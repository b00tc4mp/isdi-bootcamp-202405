import createPost from './createPost.js'
import deletePosts from './deletePosts.js'
import editPost from './editPost.js'
import getAllPosts from './getAllPosts.js'
import getFollowedUserPosts from './getFollowedUserPosts.js'
import getUser from './getUser.js'
import getUserName from './getUserName.js'
import getUserSavedPosts from './getUserSavedPosts.js'
import getUserPosts from './getUserPosts.js'
import getUserId from './getUserId.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import toggleUserFollow from './toggleUserFollow.js'
import togglePostLike from './togglePostLike.js'
import toggleSavedPost from './toggleSavedPost.js'
import editUserAvatar from './editUserAvatar.js'
import editUserUsername from './editUserUsername.js'
import isLoggedIn from './isLoggedIn.js'
import searchPosts from './searchPosts.js'

const logic = {
    createPost,
    deletePosts,
    editPost,
    editUserAvatar,
    editUserUsername,
    getAllPosts,
    getFollowedUserPosts,
    getUser,
    getUserName,
    getUserSavedPosts,
    getUserPosts,
    getUserId,
    loginUser,
    logoutUser,
    registerUser,
    toggleUserFollow,
    togglePostLike,
    toggleSavedPost,
    isLoggedIn,
    searchPosts
}

export default logic