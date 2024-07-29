import createPost from './createPost.js'
import deletePosts from './deletePosts.js'
import editPost from './editPost.js'
import getAllPosts from './getAllPosts.js'
import getFollowedUserPosts from './getFollowedUserPosts.js'
import getUser from './getUser.js'
import getUserList from './getUserList.js'
import getUserName from './getUserName.js'
import getUserSavedPosts from './getUserSavedPosts.js'
import getUserPosts from './getUserPosts.js'
import getUserUsername from './getUserUsername.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import toggleUserFollow from './toggleUserFollow.js'
import togglePostLike from './togglePostLike.js'
import toggleSavedPost from './toggleSavedPost.js'
import editUserAvatar from './editUserAvatar.js'
import editUserUsername from './editUserUsername.js'

const logic = {
    createPost,
    deletePosts,
    editPost,
    editUserAvatar,
    editUserUsername,
    getAllPosts,
    getFollowedUserPosts,
    getUser,
    getUserList,
    getUserName,
    getUserSavedPosts,
    getUserPosts,
    getUserUsername,
    loginUser,
    logoutUser,
    registerUser,
    toggleUserFollow,
    togglePostLike,
    toggleSavedPost
}

export default logic