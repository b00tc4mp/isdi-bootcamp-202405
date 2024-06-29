import addPost from './addPost.mjs'
import deletePosts from './deletePosts.mjs'
import searchUser from './searchUser.mjs'
import editPost from './editPost.mjs'
import getAllPostIDs from './getAllPostIDs.mjs'
import getAllPosts from './getAllPosts.mjs'
import getIntervalID from './getIntervalID.mjs'
import getUserName from './getUserName.mjs'
import getUserSavedPosts from './getUserSavedPosts.mjs'
import getUserPosts from './getUserPosts.mjs'
import getUserUsername from './getUserUsername.mjs'
import hasLikedPost from './hasLikedPost.mjs'
import hasPostSaved from './hasPostSaved.mjs'
import loginUser from './loginUser.mjs'
import logoutUser from './logoutUser.mjs'
import registerUser from './registerUser.mjs'
import setAllPosts from './setAllPosts.mjs'
import setIntervalID from './setIntervalID.mjs'
import togglePostLike from './togglePostLike.mjs'
import toggleSavedPost from './toggleSavedPost.mjs'

const logic = {
    addPost,
    deletePosts,
    searchUser,
    editPost,
    getAllPostIDs,
    getAllPosts,
    getIntervalID,
    getUserName,
    getUserSavedPosts,
    getUserPosts,
    getUserUsername,
    hasLikedPost,
    hasPostSaved,
    loginUser,
    logoutUser,
    registerUser,
    setAllPosts,
    setIntervalID,
    togglePostLike,
    toggleSavedPost
};

export default logic;