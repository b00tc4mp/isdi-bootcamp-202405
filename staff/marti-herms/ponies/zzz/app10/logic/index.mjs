import addPost from './addPost.mjs'
import deletePosts from './deletePosts.mjs'
import editPost from './editPost.mjs'
import getAllPosts from './getAllPosts.mjs'
import getFollowedUserPosts from './getFollowedUserPosts.mjs'
import getUserList from './getUserList.mjs'
import getUserName from './getUserName.mjs'
import getUserSavedPosts from './getUserSavedPosts.mjs'
import getUserPosts from './getUserPosts.mjs'
import getUserUsername from './getUserUsername.mjs'
import hasLikedPost from './hasLikedPost.mjs'
import hasPostSaved from './hasPostSaved.mjs'
import isUserFollowing from './isUserFollowing.mjs'
import loginUser from './loginUser.mjs'
import logoutUser from './logoutUser.mjs'
import registerUser from './registerUser.mjs'
import toggleUserFollow from './toggleUserFollow.mjs'
import togglePostLike from './togglePostLike.mjs'
import toggleSavedPost from './toggleSavedPost.mjs'

const logic = {
    addPost,
    deletePosts,
    editPost,
    getAllPosts,
    getFollowedUserPosts,
    getUserList,
    getUserName,
    getUserSavedPosts,
    getUserPosts,
    getUserUsername,
    hasLikedPost,
    hasPostSaved,
    isUserFollowing,
    loginUser,
    logoutUser,
    registerUser,
    toggleUserFollow,
    togglePostLike,
    toggleSavedPost
};

export default logic;