import createPost from './createPost.js'
import deletePost from './deletePost.js'
import editPost from './editPost.js'
import editUserAvatar from './editUserAvatar.js'
import editUserUsername from './editUserUsername.js'
import getAllPosts from './getAllPosts.js'
import getFollowedUserPosts from './getFollowedUserPosts.js'
import getUser from './getUser.js'
import getUserName from './getUserName.js'
import getUserSavedPosts from './getUserSavedPosts.js'
import getUserPosts from './getUserPosts.js'
import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import toggleUserFollow from './toggleUserFollow.js'
import togglePostLike from './togglePostLike.js'
import toggleSavedPost from './toggleSavedPost.js'
import searchPosts from './searchPosts.js'

const logic = {
    createPost,
    deletePost,
    editPost,
    editUserAvatar,
    editUserUsername,
    getAllPosts,
    getFollowedUserPosts,
    getUser,
    getUserName,
    getUserSavedPosts,
    getUserPosts,
    authenticateUser,
    registerUser,
    toggleUserFollow,
    togglePostLike,
    toggleSavedPost,
    searchPosts
}

export default logic