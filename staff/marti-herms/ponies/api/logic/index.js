import addPost from './addPost.js'
import deletePosts from './deletePosts.js'
import editPost from './editPost.js'
import editUserInfo from './editUserInfo.js'
import getAllPosts from './getAllPosts.js'
import getFollowedUserPosts from './getFollowedUserPosts.js'
import getUserAvatar from './getUserAvatar.js'
import getUserFollowed from './getUserFollowed.js'
import getUserFollowers from './getUserFollowers.js'
import getUserPostNumber from './getUserPostNumber.js'
import getUserList from './getUserList.js'
import getUserName from './getUserName.js'
import getUserSavedPosts from './getUserSavedPosts.js'
import getUserPosts from './getUserPosts.js'
import getUserUsername from './getUserUsername.js'
import hasLikedPost from './NUhasLikedPost.js'
import hasPostSaved from './hasPostSaved.js'
import isUserFollowing from './isUserFollowing.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import toggleUserFollow from './toggleUserFollow.js'
import togglePostLike from './togglePostLike.js'
import toggleSavedPost from './toggleSavedPost.js'

const logic = {
    addPost,
    deletePosts,
    editPost,
    editUserInfo,
    getAllPosts,
    getFollowedUserPosts,
    getUserAvatar,
    getUserFollowed,
    getUserFollowers,
    getUserPostNumber,
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